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
        return Vue.axios
        //.get(`${resource}/${id}`)
        .get(`${x}`)
        .catch((error) => {
            throw new Error(`[SDC] ApiService ::: get ::: ${error}`)
        })
    },
    post(resource, params, extra = '') {
        return Vue.axios.post(`${resource}`, params, extra)
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
        return ApiService.get(resource, id)
    },
    create (params) {
        const resource = "/campaigns"
        return ApiService.post(resource, params)
    },
    update (id, params) {
        return ApiService.update('campaigns', id, {campaign: params})
    },
    destroy (id){
        return ApiService.delete(`campaigns/${id}`)
    }
}
export const BeaconsService = {
    get(client, id) {
        const resource = "clients/" + client + "/beacons"
        return ApiService.get(resource, id)
    },
    create (params) {
        return ApiService.post('beacons', {beacon: params})
    },
    update (id, params) {
        return ApiService.update('beacons', id, params)
    },
    destroy (id){
        return ApiService.delete(`beacons/${id}`)
    }
}
export const AdsService = {
    get(client, campaign, id){
        const resource = "clients/" + client + "/campaigns/" + campaign + "/ads"
        return ApiService.get(resource, id)
    },
    create (params) {
        return ApiService.post('/ads', params,  {headers: {'Content-Type': 'multipart/form-data'}})
    },
    update (id, params) {
        ApiService.setMultiPartHeader();
        return ApiService.update('/ads', id, params)
    },
    destroy (campaign, id){
        return ApiService.delete(`campaigns/${campaign}/ads/${id}`)
    }
}
