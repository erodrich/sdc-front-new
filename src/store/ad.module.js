import { AdsService } from '@/common/api.service'
import { FETCH_ADS } from '@/store/actions.type'
import { SET_ADS } from '@/store/mutations.type'

const state = {
    ads: [],
    ad: {},

}
const getters = {
    ads(state) {
        return state.ads
    }

}
const actions = {
    [FETCH_ADS] ({commit, rootGetters}, id = '') {
        console.log(rootGetters.campaign.id)
        return AdsService
        .get(rootGetters.getClientId, rootGetters.campaign.id, id)
        .then(( response ) => {
            console.log(response.data)
            commit(SET_ADS, response.data)
        })
        .catch((error) => {
            throw new Error(error)
        })
    },

}
const mutations = {
    [SET_ADS] (state, data) {

    }

}

export default {
    state,
    getters,
    actions,
    mutations,
}