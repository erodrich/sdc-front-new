import { CampaignsService } from '@/common/api.service'
import {
  FETCH_CAMPAIGNS,
  CAMPAIGN_NEW,
} from './actions.type'
import {
  SET_CAMPAIGNS
} from './mutations.type'

const state = {
  campaigns: [],
  campaign: {},
  campaignsCount: 0,

}
const getters = {
    campaigns (state) {
        return state.campaigns
    },
    campaign (state) {
        return state.campaign
    },
}
const mutations = {
    [SET_CAMPAIGNS] (state, data) {
        state.campaigns = []
        data = data.data
        if(data instanceof Array){
            var i;
            for(i = 0; i < data.length; i++){
                const campaign = {
                    id: data[i].id,
                    name: data[i].attributes.name,
                    start_date: data[i].attributes.start_date,
                    end_date: data[i].attributes.end_date,
                    active: data[i].attributes.active == 1 ? true : false
                }
                state.campaigns.push(campaign)
            }
        } else {
            const campaign = {
                id: data.id,
                name: data.attributes.name,
                start_date: data.attributes.start_date,
                end_date: data.attributes.end_date,
                active: data.attributes.active == 1 ? true : false,
                ads: data.relationships.ads.data,
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
        .then(( response ) => {
            commit(SET_CAMPAIGNS, response.data)
        })
        .catch((error) => {
            throw new Error(error)
        })
    },
    [CAMPAIGN_NEW] (context, campaign) {
        campaign.client_id = context.rootGetters.getClientId
        console.log(campaign)
        return CampaignsService
        .create(campaign)
        .then((response) => {
            console.log(response.data)
        })
        .catch()
    }
}

export default {
    state,
    actions,
    mutations,
    getters
}
