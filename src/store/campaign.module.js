import { CampaignsService } from '@/common/api.service'
import {
  FETCH_CAMPAIGNS
} from './actions.type'
import {
  SET_CAMPAIGNS
} from './mutations.type'

const state = {
  campaigns: {},
  isLoading: true,
  campaignsCount: 0
}
const getters = {
    campaigns (state) {
        return state.campaigns
    }
}
const mutations = {
    [SET_CAMPAIGNS] (state, data) {
        console.log("SET_CAMPAIGNS: " + data)
        state.campaigns = data.data
    }

}
const actions = {
    [FETCH_CAMPAIGNS] ({commit, rootGetters}, id = '') {
        return CampaignsService
        .get(rootGetters.getClientId, id)
        .then(( response ) => {
            console.log(response.data)
            commit(SET_CAMPAIGNS, response.data)
        })
        .catch((error) => {
            throw new Error(error)
        })
    },
}

export default {
    state,
    actions,
    mutations,
    getters
}
