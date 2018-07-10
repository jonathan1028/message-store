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
    showCreateOpportunity: false,
    activeProfileTab: null,
    searchQuery: 'store'
  },

  // getters: {
  //   searchQuery (state) {
  //     return state.searchQuery
  //   }
  // },

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
    },
    updateActiveProfileTab (state, data) {
      state.activeProfileTab = data
    },
    updateSearchQuery (state, data) {
      console.log('Search Query', data)
      state.searchQuery = data
    }
  },
  plugins: [vuexLocal.plugin]
})

export default store
