import { StatisticsService } from '@/common/api.service'
import { FETCH_OVERVIEW, FETCH_INTERACTIONS } from '@/store/actions.type'
import { SET_OVERVIEW, SET_INTERACTIONS } from '@/store/mutations.type'

const state = {
  overview: {},
  interactions: [],
  interactionsCount: 0,
  interaction: {}
}

const getters = {
  interactions (state) {
    return state.interactions
  },
  overview (state) {
    return state.overview
  },
  interactionsCount (state) {
    return state.interactionsCount
  }
}

const actions = {
  [FETCH_OVERVIEW] (context) {
    return StatisticsService
      .getOverview(context.rootGetters.getClientId)
      .then((response) => {
        console.log(response.data)
        context.commit(SET_OVERVIEW, response.data)
      })
      .catch((error) => {
        throw error
      })
  },
  [FETCH_INTERACTIONS] (context, id = '') {
    return StatisticsService
      .getSearch(context.rootGetters.getClientId)
      .then(response => {
        // console.log(response.data)
        context.commit(SET_INTERACTIONS, response.data)
      })
      .catch(error => {
        throw error
      })
  }
}

const mutations = {
  [SET_OVERVIEW] (state, data) {
    console.log(data)
    data = data.data

    state.overview = {
      id: data.id,
      client_id: data.attributes.client_id,
      total_campaigns: data.attributes.total_campaigns,
      active_campaigns: data.attributes.active_campaigns,
      total_ads: data.attributes.total_ads,
    }
  },
  [SET_INTERACTIONS] (state, data) {
    data = data.data
    if (data instanceof Array) {
      state.interactions = []
      var i
      state.interactionsCount = data.length
      for (i = 0; i < data.length; i++) {
        let interaction = {
          id: data[i].id,
          campaign: data[i].attributes.campaign,
          ad: data[i].attributes.ad,
          beacon: data[i].attributes.beacon,
          action: data[i].attributes.action,
          fecha_hora: data[i].attributes.timestamp
        }
        state.interactions.push(interaction)
      }
    } else {
      state.interaction = {
        id: data.id,
        campaign: data.attributes.campaign,
        ad: data.attributes.ad,
        beacon: data.attributes.beacon,
        action: data.attributes.action,
        fecha_hora: data.attributes.action
      }
    }
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
