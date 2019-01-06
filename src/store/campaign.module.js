import { CampaignsService } from '@/common/api.service'
import {
  FETCH_CAMPAIGNS,
  CAMPAIGN_NEW,
  CAMPAIGN_DELETE,
  CAMPAIGN_EDIT
} from './actions.type'
import {
  SET_CAMPAIGNS
} from './mutations.type'

const state = {
  campaigns: [],
  campaign: {},
  campaignsCount: 0

}
const getters = {
  campaigns (state) {
    // let campaigns = state.campaigns.sort((a, b) => (a.id < b.id ? 1 : -1))
    return state.campaigns
  },
  campaign (state) {
    return state.campaign
  }
}
const mutations = {
  [SET_CAMPAIGNS] (state, data) {
    data = data.data
    if (data instanceof Array) {
      state.campaigns = []
      var i
      state.campaignsCount = data.length
      for (i = 0; i < data.length; i++) {
        const campaign = {
          id: data[i].id,
          name: data[i].attributes.name,
          start_date: data[i].attributes.start_date,
          end_date: data[i].attributes.end_date,
          // active: data[i].attributes.active == 1 ? true : false
          active: data[i].attributes.active,
          beacons: data[i].relationships.beacons.data
        }
        state.campaigns.push(campaign)
      }
    } else {
      const campaign = {
        id: data.id,
        name: data.attributes.name,
        start_date: data.attributes.start_date,
        end_date: data.attributes.end_date,
        // active: data.attributes.active == 1 ? true : false,
        active: data.attributes.active,
        ads: data.relationships.ads.data.length ? data.relationships.ads.data : null,
        beacons: data.relationships.beacons.data
      }
      state.campaign = campaign
    }
  }
}
const actions = {
  [FETCH_CAMPAIGNS] ({commit, rootGetters}, id = '') {
    return CampaignsService
      .get(rootGetters.getClientId, id)
      .then((response) => {
        commit(SET_CAMPAIGNS, response.data)
      })
      .catch((error) => {
        // console.log(error)
        throw error
      })
  },
  [CAMPAIGN_NEW] (context, campaign) {
    return CampaignsService
      .create(campaign)
      .then((response) => {
        console.log(response.data)
        return response.data
      })
      .catch((error) => {
        console.log('Error en CAMPAIGN_NEW')
      })
  },
  [CAMPAIGN_DELETE] (context, id) {
    console.log('Deleting: ' + id)
    return CampaignsService
      .destroy(id)
  },
  [CAMPAIGN_EDIT] (context, campaign) {
    console.log('Updating: ' + JSON.stringify(campaign))
    return CampaignsService
      .update(campaign.id, campaign)
      .then((response) => {
        console.log(response.data)
        return response.data
      })
      .catch((error) => {
        console.log('Error: ' + JSON.stringify(error))
      })
  }
}

export default {
  state,
  actions,
  mutations,
  getters
}
