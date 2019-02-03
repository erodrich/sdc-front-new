import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import JwtService from '@/common/jwt.service'
import { API_URL } from '@/common/config'

const ApiService = {
  init () {
    Vue.use(VueAxios, axios)
    Vue.axios.defaults.baseURL = API_URL
    Vue.axios.defaults.headers.common['Accept'] = 'application/json'
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
  get (resource, id = '') {
    let x = resource
    if (id) {
      console.log('Id exist')
      id.match(/page/) ? id = `?${id}` : id = `/${id}`
    }
    x += id
    console.log('ApiService :: get :: ' + x)
    return Vue.axios
      .get(`${x}`)
      .catch((error) => {
        // console.log(error)
        throw error
      })
  },
  post (resource, params, extra = '') {
    return Vue.axios.post(`${resource}`, params, extra)
  },
  update (resource, id, params) {
    console.log(params)
    return Vue.axios.put(`${resource}/${id}`, params)
  },
  put (resource, params) {
    return Vue.axios.put(`${resource}`, params)
  },
  delete (resource) {
    return Vue.axios
      .delete(resource)
      .catch((error) => {
        // throw new Error(`[SDC] ApiService ::: delete ::: ${error}`)
        throw error
      })
  }
}
export default ApiService

export const CampaignsService = {
  get (client, id) {
    const resource = 'clients/' + client + '/campaigns'
    return ApiService.get(resource, id)
  },
  create (params) {
    const resource = '/campaigns'
    return ApiService.post(resource, params)
  },
  update (id, params) {
    return ApiService.update('campaigns', id, params)
  },
  destroy (id) {
    return ApiService.delete(`campaigns/${id}`)
  }
}
export const BeaconsService = {
  get (client, id) {
    const resource = 'clients/' + client + '/beacons'
    return ApiService.get(resource, id)
  },
  create (params) {
    return ApiService.post('beacons', {beacon: params})
  },
  update (id, params) {
    return ApiService.update('beacons', id, params)
  },
  destroy (id) {
    return ApiService.delete(`beacons/${id}`)
  }
}
export const AdsService = {
  get (client, campaign, id) {
    const resource = 'clients/' + client + '/campaigns/' + campaign + '/ads'
    return ApiService.get(resource, id)
  },
  create (params) {
    return ApiService.post('/ads', params, {headers: {'Content-Type': 'multipart/form-data'}})
  },
  update (id, params) {
    // return ApiService.update('ads', id, params)
    let resource = 'ads'
    return Vue.axios.post(`${resource}/${id}`, params, {headers: {'Content-Type': 'multipart/form-data'}})
  },
  destroy (id) {
    return ApiService.delete(`ads/${id}`)
  }
}

export const StatisticsService = {
  getOverview (client) {
    const resource = 'statistics/client/' + client + '/overview'
    return ApiService.get(resource)
  },
  getSearch (client, params) {
    const resource = 'statistics/client/' + client + '/search'
    return ApiService.get(resource)
  }
}

export const ClientsService = {
  get (id) {
    const resource = 'clients'
    return ApiService.get(resource, id)
  },
  create (params) {
    return ApiService.post('clients', params)
  },
  update (id, params) {
    return ApiService.update('clients', id, params)
  },
  destroy (id) {
    return ApiService.delete(`clients/${id}`)
  }
}

export const UsersService = {
  get (id) {
    const resource = 'users/'
    return ApiService.get(resource, id)
  },
  create (params) {
    return ApiService.post('users', params)
  },
  update (id, params) {
    return ApiService.update('users', id, params)
  },
  destroy (id) {
    return ApiService.delete(`users/${id}`)
  }
}
