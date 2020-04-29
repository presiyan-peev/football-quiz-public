import Vue from 'vue'
import Vuex from 'vuex'
import game from './modules/game'
import regSpecial from './modules/special-registration'


Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    game,
    regSpecial
  },
  
})