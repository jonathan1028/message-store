import Vue from 'vue'
import Vuex from 'vuex'
import auth from './modules/auth'
import VuexPersistence from 'vuex-persist'

Vue.use(Vuex)

// This will cause the entire auth module to persist through page refreshes
const vuexLocal = new VuexPersistence({
  storage: window.localStorage,
  modules: ['auth']
})

const store = new Vuex.Store({
  modules: {
    auth
  },
  state: {
    count: 0,
    person: {},
    showCreatePerson: false,
    showCreateOpportunity: false
  },
  mutations: {
    increment (state) {
      state.count++
    },
    toggleDisplay (state) {
      state.showCreatePerson = !state.showCreatePerson
    },
    toggleCreateOpportunity (state) {
      state.showCreateOpportunity = !state.showCreateOpportunity
    }
  },
  plugins: [vuexLocal.plugin]
})

export default store
