<template>
    <h5>
        <h5>
          <a :href='url3' target="_blank">{{name}}</a>(<a :href='url4' target="_blank">{{changePercent}}</a>)
        </h5>
        <h5 color=gray>
          {{biggest}}({{biggestPercent}}) ▲{{biggestdiff}}
        </h5>
        <div v-if='biggestDiffPercent >= 1 || bigDiffPercent >= 1'>
          <h5 color=red> in </h5>
        </div>
        <h5 color=red>
          {{big}}({{bigPercent}} ▲{{bigdiff}}
        </h5>
    </h5>
</template>

<script>
import axios from 'axios'
export default {
  data: function () {
    return {
      name: 'xx',
      zj: 'xx',
      zjdiff: 'xx',
      lastbig: 0,
      lastbiggest: 0,
      lastbigdiff: 0,
      lastbiggestdiff: 0,
      meta: {},
      amount: 0,
      price: 0,
      high: 0,
      low: 0,
      begin: 0,
      volume: 0,
      turnoverRate: 0,
      lastOverPrice: 0,
      code: 0,
      market: 0,
      upperbound: 0,
      lowerbound: 0
    }
  },
  props: ['secid'],
  computed: {
    url: function () {
      return 'http://push2.eastmoney.com/api/qt/stock/fflow/kline/get?lmt=0&klt=1&secid=' + this.secid + '&fields1=f1,f2,f3,f7&fields2=f51,f52,f53,f54,f55,f56,f57,f58,f59,f60,f61,f62,f63&ut=b2884a393a59ad64002292a3e90d46a5'
    },
    url2: function () {
      return 'http://push2.eastmoney.com/api/qt/stock/get?fltt=2&secid=' + this.secid + '&invt=2&fields=f43,f57,f58,f169,f170,f46,f44,f51,f168,f47,f164,f163,f116,f60,f45,f52,f50,f48,f167,f117,f71,f161,f49,f530,f135,f136,f137,f138,f139,f141,f142,f144,f145,f147,f148,f140,f143,f146,f149,f55,f62,f162,f92,f173,f104,f105,f84,f85,f183,f184,f185,f186,f187,f188,f189,f190,f191,f192,f107,f111,f86,f177,f78,f110,f262,f263,f264,f267,f268,f250,f251,f252,f253,f254,f255,f256,f257,f258,f266,f269,f270,f271,f273,f274,f275,f127,f199,f128,f193,f196,f194,f195,f197,f80,f280,f281,f282,f284,f285,f286,f287,f292&ut=fa5fd1943c7b386f172d6893dbfba10b'
    },
    url3: function () {
      return 'http://data.eastmoney.com/zjlx/' + this.code + '.html'
    },
    url4: function () {
      if (this.code[0] === '6') {
        return 'http://quote.eastmoney.com/sh' + this.code + '.html'
      } else {
        return 'http://quote.eastmoney.com/SZ' + this.code + '.html'
      }
    },
    namec: function () {
      return this.name
    },
    zjc: function () {
      return this.zj
    },
    zjdiffc: function () {
      return this.zjdiff
    },
    biggest: function () {
      var last = this.lastbiggest
      var l = this.zjc.split(',')
      return this.updateBiggest(last, l)
    },
    big: function () {
      var last = this.lastbig
      var l = this.zjc.split(',')
      return this.updateBig(last, l)
    },
    biggestdiff: function () {
      var l = this.zjdiffc.split(',')
      return this.updateBiggestDiff(l)
    },
    bigdiff: function () {
      var l = this.zjdiffc.split(',')
      return this.updateBigDiff(l)
    },
    change: function () {
      if (this.lastOverPrice && this.lastOverPrice > 0.0001) {
        return (this.price - this.lastOverPrice).toFixed(2)
      } else {
        return 0
      }
    },
    changePercent: function () {
      if (this.lastOverPrice && this.lastOverPrice > 0.0001) {
        return (this.change / this.lastOverPrice * 100).toFixed(2)
      } else {
        return 0
      }
    },
    amountMillion: function () {
      return this.amount / 1000000
    },
    bigPercent: function () {
      if (this.amount && this.amount > 0) {
        return (this.lastbig / this.amountMillion * 100).toFixed(2)
      } else {
        return 0
      }
    },
    biggestPercent: function () {
      if (this.amount && this.amount > 0) {
        return (this.lastbiggest / this.amountMillion * 100).toFixed(2)
      } else {
        return 0
      }
    },
    bigDiffPercent: function () {
      if (this.amount && this.amount > 0) {
        return (this.lastbigdiff / this.amountMillion * 100).toFixed(2)
      } else {
        return 0
      }
    },
    biggestDiffPercent: function () {
      if (this.amount && this.amount > 0) {
        return (this.lastbiggestdiff / this.amountMillion * 100).toFixed(2)
      } else {
        return 0
      }
    }
  },
  created: function () {
    var _this = this
    setInterval(function () {
      axios.get(_this.url).then(
        function (res) {
          // console.log(res.data.data)
          _this.name = res.data.data.name
          var len = res.data.data.klines.length
          _this.zj = res.data.data.klines[len - 1]

          var mn = 0
          if (mn < res.data.data.klines.length - 5) {
            mn = res.data.data.klines.length - 5
          }
          _this.zjdiff = res.data.data.klines[mn]
        },
        function (error) {
          if (error) {
            console.log(error)
          }
        })
      axios.get(_this.url2).then(
        function (res) {
          _this.meta = res.data.data
          _this.amount = _this.meta.f48
          // name f58
          _this.price = _this.meta.f43
          _this.high = _this.meta.f44
          _this.low = _this.meta.f45
          _this.begin = _this.meta.f46
          _this.volume = _this.meta.f47
          _this.turnoverRate = _this.meta.f168
          _this.volumeRate = _this.meta.f50
          _this.lastOverPrice = _this.meta.f60
          _this.code = _this.meta.f57
          _this.market = _this.meta.f78
          _this.upperbound = _this.meta.f51
          _this.lowerbound = _this.meta.f52
        },
        function (error) {
          if (error) {
            console.log(error)
          }
        })
    }, 60000 + Math.random() * 60000)
  },
  methods: {
    extractBig: function (l) {
      return parseFloat(l[4]) / 1000000
    },
    extractBiggest: function (l) {
      return parseFloat(l[5]) / 1000000
    },
    updateBig: function (last, l) {
      if (l.length < 6) {
        this.lastbig = 0
        return 0
      }
      this.lastbig = this.extractBig(l)
      if (Math.abs(this.lastbig - last) > 1e-6) {
        this.$emit('updateBig', this.secid, this.lastbig - last)
      }
      return this.lastbig.toFixed(2)
    },
    updateBiggest: function (last, l) {
      if (l.length < 6) {
        this.lastbiggest = 0
        return 0
      }
      this.lastbiggest = this.extractBiggest(l)
      if (Math.abs(this.lastbiggest - last) > 1e-6) {
        this.$emit('updateBiggest', this.secid, this.lastbiggest - last)
      }
      return this.lastbiggest.toFixed(2)
    },
    updateBigDiff: function (l) {
      if (l.length < 6) {
        this.lastbigdiff = 0
        return 0
      }
      this.lastbigdiff = this.extractBig(l) - this.lastbig
      return this.lastbigdiff.toFixed(2)
    },
    updateBiggestDiff: function (l) {
      if (l.length < 6) {
        this.lastbiggestdiff = 0
        return 0
      }
      this.lastbiggestdiff = this.extractBiggest(l) - this.lastbiggest
      return this.lastbiggestdiff.toFixed(2)
    }
  }

}
</script>

<style>
</style>
