import Vue from 'vue'
import Vuex from 'vuex'

import home from './home.module'
import auth from './auth.module'
import campaigns from './campaign.module'
import ad from './ad.module'
import beacons from './beacon.module'
import statistics from './statistics.module'
import message from './message.module'
import client from './client.module'
//import profile from './profile.module'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    home,
    auth,
    campaigns,
    ad,
    beacons,
    statistics,
    message,
    client
 //   profile
  }
})
