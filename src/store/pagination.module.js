import {LOAD_PAGINATION } from './actions.type'
import {SET_PAGINATION } from './mutations.type'

const state = {
  current: 1,
  next: null,
  prev: null,
  last: 1

}
const getters = {
    current (state) {
        return state.current
    },
    next (state) {
        return state.next
    },
    prev (state) {
        return state.prev
    },
    last (state) {
        return state.last
    },
}
const actions = {
  [LOAD_PAGINATION] (context, data) {
    context.commit(SET_PAGINATION, data)
  }
}
const mutations = {
  [SET_PAGINATION] (state , data) {
    if(data.links.next) {
        var idxN = data.links.next.indexOf("=")
        state.next = data.links.next.slice(idxN+1)
    } else {
        state.next = null
    }
    if(data.links.prev) {
        console.log("chihuan")
        var idxP = data.links.prev.indexOf("=")
        state.prev = data.links.prev.slice(idxP+1)
    } else {
        state.prev = null
    }
    state.current = data.meta.current_page,
    state.last = data.meta.last_page
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
