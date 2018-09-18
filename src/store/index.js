import Vue from 'vue'
import Vuex from 'vuex'

import home from './home.module'
import auth from './auth.module'
import campaigns from './campaign.module'
import ad from './ad.module'
//import article from './article.module'
//import profile from './profile.module'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    home,
    auth,
    campaigns,
    ad,
 //   article,
 //   profile
  }
})
