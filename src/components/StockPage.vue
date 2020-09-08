<template>
  <div >
    <!--
    <table border=1>
      <div v-for="(seclist, key)  in secidMap" :key=key>
          <StockRow :secidList="seclist" :title=key>
          </StockRow>
      </div>
    </table>
    -->
    <!--
    <div>
      {{secidMap}}
    </div>
    -->
    <div v-if='show'>
    <table border=2>
      <tr v-for="(seclist, key)  in secidMap" :key=key>
        <td>
          {{key}}
          {{bkBiggestMap[key]}}
          {{bkBigMap[key]}}
        </td>
    <td v-for="sec  in seclist" :key=sec>
        <Stock :secid="sec" @updateBig=updateBig @updateBiggest=updateBiggest>
        </Stock>
    </td>
      </tr>
    </table>
    </div>
  </div>
</template>

<script>
import StockRow from './StockRow'
import Stock from './Stock'
import store from '../store'
import axios from 'axios'
export default {
  name: '',
  store,
  data () {
    return {
      secidMap: {
        '军工': ['1.600862', '1.600685', '1.600760', '1.600765', '1.600150', '1.600072', '1.600855', '0.002025', '0.002389', '0.300589', '0.000738', '0.300722'],
        '医疗': ['1.600196', '1.601216', '1.600211', '1.600079', '0.300122', '1.600511', '1.600056', '1.600285', '1.603718'],
        '免税': ['1.600859', '1.600712', '0.000501', '1.601888', '0.002707', '1.600606', '1.600827', '0.002059', '0.002251', '0.000524', '1.600185', '0.002277', '1.603069'],
        '券商': ['1.601788', '1.600999', '0.002736', '0.000776', '0.300059', '1.600837', '1.600109'],
        '有色': ['0.000960', '1.600392', '0.300618', '1.601020', '1.601212', '0.000426', '1.600531'],
        '抖音': ['0.002400', '0.002425', '1.603598', '0.300242', '0.300541'],
        '科技': ['0.002409', '0.002157', '0.002649', '1.600584'],
        '银行': ['1.600036', '0.002142', '0.000001', '1.601009', '1.601818']
      },
      bigMap: {},
      biggestMap: {},
      bkBigMap: {},
      bkBiggestMap: {},
      url: 'http://push2.eastmoney.com/api/qt/clist/get?pn=1&pz=100&po=1&np=1&fltt=2&invt=2&fid=f62&fs=b:BK0815&stat=1&fields=f12,f14,f2,f3,f62,f184,f66,f69,f72,f75,f78,f81,f84,f87,f204,f205,f124',
      url2: 'http://push2.eastmoney.com/api/qt/clist/get?pn=1&pz=100&po=1&np=1&fltt=2&invt=2&fid=f62&fs=b:BK0816&stat=1&fields=f12,f14,f2,f3,f62,f184,f66,f69,f72,f75,f78,f81,f84,f87,f204,f205,f124&rt=53253677',
      show: false
    }
  },
  created: function () {
    var _this = this
    axios.get(_this.url).then(
      function (res) {
        if (res && res.data) {
          var list = res.data.data.diff
          console.log(list)
          _this.secidMap['昨日涨停'] = []
          for (const l of list) {
            _this.secidMap['昨日涨停'].push(_this.secidFromCode(l.f12))
          }
        }
      },
      function (error) {
        if (error) {
          console.log(error)
        }
      }
    )
    axios.get(_this.url2).then(
      function (res) {
        if (res && res.data) {
          var list = res.data.data.diff
          console.log(list)
          _this.secidMap['昨日连板'] = []
          for (const l of list) {
            _this.secidMap['昨日连板'].push(_this.secidFromCode(l.f12))
          }
        }
      },
      function (error) {
        if (error) {
          console.log(error)
        }
      }
    )
    setTimeout(function () {
      for (const key in _this.secidMap) {
        _this.bkBigMap[key] = 0
        _this.bkBiggestMap[key] = 0
        for (const item of _this.secidMap[key]) {
          _this.bigMap[item] = 0
          _this.biggestMap[item] = 0
        }
      }
      _this.show = true
    }, 5000)
    /*
    var _this = this
    setInterval(function () {
      for (const key in this.secidMap) {
        var totalBig = 0
        var totalBiggest = 0
        for (const item in _this.secidMap[key]) {
          totalBig += _this.bigMap[item]
          totalBiggest += _this.biggestMap[item]
        }
        _this.bkBigMap[key] = totalBig
        _this.bkBiggestMap[key] = totalBiggest
      }
      _this.$store.commit('updateBkBig', _this.bkBigMap)
      _this.$store.commit('updateBkBiggest', _this.bkBiggestMap)
    }, 6000)
    */
  },
  components: {
    StockRow, Stock
  },
  computed: {
    bkBigMapc: function () {
      return this.$store.state.bkBigMap
    },
    bkBiggestMapc: function () {
      return this.$store.state.bkBiggestMap
    }
  },
  methods: {
    updateBig: function (secid, diff) {
      this.bigMap[secid] += diff
      this.$store.commit('diffBig', secid, diff)
    },
    updateBiggest: function (secid, diff) {
      this.biggestMap[secid] += diff
      this.$store.commit('diffBiggest', secid, diff)
    },
    secidFromCode: function (code) {
      if (code[0] === '6') {
        return '1.' + code
      } else {
        return '0.' + code
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
