import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    bigMap: {},
    biggestMap: {},
    bkBigMap: {},
    bkBiggestMap: {}
  },
  mutations: {
    updateBig (state, big) {
      state.bigMap = big
    },
    updateBiggest (state, biggest) {
      state.biggestMap = biggest
    },
    updateBkBig (state, bkBig) {
      state.bkBigMap = bkBig
    },
    updateBkBiggest (state, bkBiggest) {
      state.bkBiggestMap = bkBiggest
    },
    diffBig (state, secid, diff) {
      if (secid in state.bigMap) {
        state.bigMap[secid] += diff
      } else {
        state.bigMap[secid] = diff
      }
    },
    diffBiggest (state, secid, diff) {
      if (secid in state.bigMap) {
        state.biggestMap[secid] += diff
      } else {
        state.biggestMap[secid] = diff
      }
    }
  }
})
