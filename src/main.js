// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuelidate from 'vuelidate'
import App from './App'
import router from '@/router'
import store from '@/store'
import { CHECK_AUTH, PURGE_MESSAGE } from '@/store/actions.type'

import ApiService from '@/common/api.service'
// import DateFilter from '@/common/date.filter'
import ErrorFilter from '@/common/error.filter'
import BootstrapVue from 'bootstrap-vue'

Vue.config.productionTip = false
Vue.config.ignoredElements = [/^ion-/]
// Vue.filter('date', DateFilter)
Vue.filter('error', ErrorFilter)
Vue.use(BootstrapVue)
Vue.use(Vuelidate)
ApiService.init()

// Ensure we checked auth before each page load.

router.beforeEach(
  (to, from, next) => {
    return Promise
      .all([store.dispatch(CHECK_AUTH)])
      .then(next)
  }
)
router.beforeEach((to, from, next) => {
  store.dispatch(PURGE_MESSAGE)
  if (to.matched.some(record => record.meta.requiresAuth)) {
    // this route requires auth, check if logged in
    // if not, redirect to login page.
    if (!store.getters.isAuthenticated) {
      next({
        name: 'login'
      })
    } else {
      next()
    }
  } else {
    next() // make sure to always call next()!
  }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
