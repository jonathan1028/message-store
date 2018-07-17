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
    currentVolunteeringLog: null,
    showCreatePerson: false,
    showCreateOpportunity: false,
    showCreateVolunteeringLog: false,
    showUpdateVolunteeringLog: false,
    activeProfileTab: null,
    searchQueryFilters: {
      keywords: '',
      today: false,
      tomorrow: false,
      thisWeek: false,
      thisWeekend: false,
      thisMonth: false,
      mornings: false,
      afternoons: false,
      evenings: false
    }
  },

  getters: {
    searchQuery (state) {
      return state.searchQueryFilters
    }
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
    toggleCreateVolunteeringLog (state) {
      state.showCreateVolunteeringLog = !state.showCreateVolunteeringLog
    },
    toggleUpdateVolunteeringLog (state) {
      state.showUpdateVolunteeringLog = !state.showUpdateVolunteeringLog
    },
    updateActiveModal (state, data) {
      console.log('State Change', data)
      state.activeModal = data
      console.log('Current State', state.activeModal)
    },
    updateCurrentOpportunity (state, data) {
      state.currentOpportunity = JSON.parse(JSON.stringify(data))
    },
    updateCurrentVolunteeringLog (state, data) {
      state.currentVolunteeringLog = JSON.parse(JSON.stringify(data))
    },
    updateActiveProfileTab (state, data) {
      state.activeProfileTab = data
    },
    updateSearchQueryFilters (state, data) {
      state.searchQueryFilters = JSON.parse(JSON.stringify(data))
    }
  },
  plugins: [vuexLocal.plugin]
})

export default store
