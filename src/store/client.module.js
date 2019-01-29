import { ClientsService } from '@/common/api.service'
import { FETCH_CLIENTS, BEACON_UPDATE } from '@/store/actions.type'
import { SET_CLIENTS, PURGE_BEACON } from '@/store/mutations.type'

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
        //console.log(response.data)
        context.commit(SET_CLIENTS, response.data)
      })
      .catch((error) => {
        throw error
      })
  },
  [BEACON_UPDATE] (context, data) {
    return ClientsService//
      .update(data.id, data)
      .then((response) => {
        //console.log(response.data)
      })
      .catch((error) => {
        console.log(error)
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
  },
  [PURGE_BEACON] (state) {
    state.beacon = {}
  }

}
export default {
  state,
  getters,
  actions,
  mutations
}
