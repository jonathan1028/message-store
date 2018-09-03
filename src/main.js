import Vue from 'vue'
import Vuex from 'vuex'
import apolloProvider from './apollo-provider'
import App from './components/App'
import router from './router'
import { GC_USER_ID } from './constants/settings'
import store from './store/index'
import Icon from 'vue-awesome/components/Icon'
import 'vue-awesome/icons'
import { format, distanceInWords } from 'date-fns'

let userId = localStorage.getItem(GC_USER_ID)

Vue.use(Vuex)

Vue.filter('formatDate', function (data) {
  if (data) {
    return format(data, 'MMMM Do YYYY, h:mm:ssa')
  }
})
Vue.filter('relativeTime', function (data) {
  if (data) {
    return distanceInWords(data, new Date()) + ' ago'
  }
})

Vue.component('icon', Icon)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  provide: apolloProvider.provide(),
  router,
  store,
  data: {
    userId
  },
  render: h => h(App)
})

router.beforeEach((to, from, next) => {
  const currentUser = userId
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth)
  if (requiresAuth && !currentUser) {
    next('/login')
  } else if (requiresAuth && currentUser) {
    next()
  } else {
    next()
  }
})
