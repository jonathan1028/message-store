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
    activeModal: null,
    currentOpportunity: null,
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
    },
    updateActiveModal (state, data) {
      console.log('State Change', data)
      state.activeModal = data
      console.log('Current State', state.activeModal)
    },
    updateCurrentOpportunity (state, data) {
      state.currentOpportunity = JSON.parse(JSON.stringify(data))
    }
  },
  plugins: [vuexLocal.plugin]
})

export default store
