import {PURGE_PAGINATION } from './actions.type'
import {SET_PAGINATION, UNSET_PAGINATION } from './mutations.type'

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
  }
}
const actions = {
  [PURGE_PAGINATION] (context) {
    context.commit(UNSET_PAGINATION)
  }
}
const mutations = {
  [SET_PAGINATION] (state, data) {
    if (data.links.next) {
      var idxN = data.links.next.indexOf('=')
      state.next = data.links.next.slice(idxN + 1)
    } else {
      state.next = null
    }
    if (data.links.prev) {
      var idxP = data.links.prev.indexOf('=')
      state.prev = data.links.prev.slice(idxP + 1)
    } else {
      state.prev = null
    }
    state.current = data.meta.current_page
    state.last = data.meta.last_page
  },
  [UNSET_PAGINATION] (state) {
    state.current = 1
    state.next = null
    state.prev = null
    state.last = 1
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
