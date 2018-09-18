import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import JwtService from '@/common/jwt.service'
import { API_URL } from '@/common/config'

const ApiService = {
    init () {
        Vue.use(VueAxios, axios)
        Vue.axios.defaults.baseURL = API_URL
    },
    
    setHeader () {
        Vue.axios.defaults.headers.common['Authorization'] = `Bearer ${JwtService.getToken()}`
    },

    query (resource, params) {
        return Vue.axios
        .get(resource, params)
        .catch((error) => {
            throw new Error(`[SDC] ApiService ::: query ::: ${error}`)
        })
    },
    get(resource, id = '') {
        let x = resource
        id != '' ? x += `/${id}` : x
        console.log("ApiService: " + resource)
        return Vue.axios
        //.get(`${resource}/${id}`)
        .get(`${x}`)
        .catch((error) => {
            throw new Error(`[SDC] ApiService ::: get ::: ${error}`)
        })
    },
    post(resource, params) {
        return Vue.axios.post(`${resource}`, params)
    },
    update(resource, id, params){
        return Vue.axios.put(`${resource}/${id}`, params)
    },
    put(resource, params){
        return Vue.axios.put(`${resource}`, params)
    },
    delete(resource){
        return Vue.axios
        .delete(resource)
        .catch((error) => {
            throw new Error(`[SDC] ApiService ::: delete ::: ${error}` )
        })
    }
}
export default ApiService

export const CampaignsService = {
    get(client, id) {
        const resource = "clients/" + client + "/campaigns"
        console.log("CampaignService: " + resource)
        return ApiService.get(resource, id)
    },
    create (params) {
        return ApiService.post('campaigns', {campaign: params})
    },
    update (id, params) {
        return ApiService.update('campaigns', id, {campaign: params})
    },
    destroy (id){
        return ApiService.delete(`campaigns/${id}`)
    }
}
export const BeaconsService = {
    get(id) {
        return ApiService.get('beacons', id)
    },
    create (params) {
        return ApiService.post('beacons', {beacon: params})
    },
    update (id, params) {
        return ApiService.update('beacons', id, {beacon: params})
    },
    destroy (id){
        return ApiService.delete(`beacons/${id}`)
    }
}
export const AdsService = {
    get(client, campaign, id){
        const resource = "clients/" + client + "/campaigns/" + campaign 
        return ApiService.get(resource, id)
    },
    create (campaign, params) {
        return ApiService.post(`campaigns/${campaign}/ads`, {ad: params})
    },
    update (campaign, id, params) {
        return ApiService.update(`campaigns/${campaign}/ads`, id, {ad: params})
    },
    destroy (campaign, id){
        return ApiService.delete(`campaigns/${campaign}/ads/${id}`)
    }
}
