import { AdsService } from '@/common/api.service'
import { FETCH_ADS } from '@/store/actions.type'
import { AD_NEW } from '@/store/actions.type'
import { SET_ADS } from '@/store/mutations.type'

const state = {
    ads: [],
    ad: {},

}
const getters = {
    ads(state) {
        return state.ads
    },
    ad(state) {
        return state.ad
    }

}
const actions = {
    [FETCH_ADS] (context, data) {
        return AdsService
        .get(context.rootGetters.getClientId, data.campaign, data.id)
        .then(( response ) => {
            context.commit(SET_ADS, response.data)
        })
        .catch((error) => {
            throw new Error(error)
        })
    },
    [AD_NEW] (context, ad) {
        return AdsService
        .create(ad)
        .then((response) => {
            console.log(response.data)
        })
        .catch((error) => {
            console.log(error)
        })
    }

}
const mutations = {
    [SET_ADS] (state, data) {
        state.ads = []
        data = data.data
        if(data instanceof Array){
            var i;
            for(i = 0; i < data.length; i++){
                const ad = {
                    id: data[i].id,
                    title: data[i].attributes.title,
                    subtitle: data[i].attributes.subtitle,
                    image_pre_url: data[i].attributes.image_pre_url,
                    image_full_url: data[i].attributes.image_full_url,
                    image_pre_name: data[i].attributes.image_pre_name,
                    image_full_name: data[i].attributes.image_full_name,
                    video_url: data[i].attributes.video_url,
                    created_at: data[i].attributes.created_at,
                }
                state.ads.push(ad)
            }
        } else {
            const ad = {
                id: data.id,
                title: data.attributes.title,
                subtitle: data.attributes.subtitle,
                image_pre_url: data.attributes.image_pre_url,
                image_full_url: data.attributes.image_full_url,
                image_pre_name: data.attributes.image_pre_name,
                image_full_name: data.attributes.image_full_name,
                video_url: data.attributes.video_url,
                created_at: data.attributes.created_at,
            }
            state.ad = ad
        }
    }

}

export default {
    state,
    getters,
    actions,
    mutations,
}