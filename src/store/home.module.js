import {MARK_AS_LOADING, MARK_AS_NOT_LOADING} from './actions.type'
import {SET_LOADING, SET_NOT_LOADING} from './mutations.type'

const state = {
  isLoading: false

}
const getters = {
  isLoading (state) {
    return state.isLoading
  }
}
const actions = {
  [MARK_AS_LOADING] (context) {
    context.commit(SET_LOADING)
  },
  [MARK_AS_NOT_LOADING] (context) {
    context.commit(SET_NOT_LOADING)
  }
}
const mutations = {
  [SET_LOADING] (state) {
    state.isLoading = true
  },
  [SET_NOT_LOADING] (state) {
    state.isLoading = false
}
}

export default {
  state,
  getters,
  actions,
  mutations
}
