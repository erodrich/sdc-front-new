import { ClientsService } from '@/common/api.service'
import { FETCH_CLIENTS, CLIENT_NEW, CLIENT_DELETE, CLIENT_EDIT } from '@/store/actions.type'
import { SET_CLIENTS, SET_PAGINATION } from '@/store/mutations.type'
import {SET_MESSAGE} from './mutations.type'

const state = {
  clients: [],
  client: {}
}
const getters = {
  clients (state) {
    return state.clients
  },
  client (state) {
    return state.client
  }
}
const actions = {
  [FETCH_CLIENTS] (context, id = '') {
    return ClientsService
      .get(id)
      .then((response) => {
        // console.log(response)
        context.commit(SET_CLIENTS, response.data)
        if(response.data.links){
          context.commit(SET_PAGINATION, response.data)
        }
      })
      .catch((error) => {
        // console.log(error)
        context.commit(SET_MESSAGE, error.response.data)
        throw error
      })
  },
  [CLIENT_NEW] (context, client) {
    console.log(client)
    return ClientsService
      .create(client)
      .then((response) => {
        // console.log(response.data)
        return response.data
      })
      .catch((error) => {
        context.commit(SET_MESSAGE, error.response.data)
        throw error
      })
  },
  [CLIENT_DELETE] (context, id) {
    console.log('Deleting: ' + id)
    return ClientsService
      .destroy(id)
      .then((response) => {
        console.log(response)
        context.commit(SET_MESSAGE, {type: 'SUCCESS', attributes: { message: 'Se eliminó el cliente'}})
      })
  },
  [CLIENT_EDIT] (context, client) {
    console.log('Updating: ' + JSON.stringify(client))
    return ClientsService
      .update(client.id, client)
      .then((response) => {
        // console.log(response.data)
        return response.data
      })
      .catch((error) => {
        context.commit(SET_MESSAGE, error.response.data)
        throw error
      })
  }
}
const mutations = {
  [SET_CLIENTS] (state, data) {
    state.clients = []
    data = data.data
    if (data instanceof Array) {
      var i
      for (i = 0; i < data.length; i++) {
        const beacon = {
          id: data[i].id,
          name: data[i].attributes.name,
          ruc: data[i].attributes.ruc,
          description: data[i].attributes.description
        }
        state.clients.push(beacon)
      }
    } else {
      const client = {
        id: data.id,
        name: data.attributes.name,
        ruc: data.attributes.ruc,
        description: data.attributes.description
      }
      state.client = client
    }
  }

}
export default {
  state,
  getters,
  actions,
  mutations
}
