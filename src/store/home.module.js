import {MARK_AS_LOADING, MARK_AS_NOT_LOADING, RESULT_MESSAGE} from './actions.type'
import {SET_LOADING, SET_NOT_LOADING, SET_MESSAGE} from './mutations.type'

const state = {
  isLoading: false,
  message: {}

}
const getters = {
  isLoading (state) {
    return state.isLoading
  },
  message (state) {
    return state.message
  }
}
const actions = {
  [MARK_AS_LOADING] (context) {
    context.commit(SET_LOADING)
  },
  [MARK_AS_NOT_LOADING] (context) {
    context.commit(SET_NOT_LOADING)
  },
  [RESULT_MESSAGE] (context, data) {
    context.commit(SET_MESSAGE, data)
  }
}
const mutations = {
  [SET_LOADING] (state) {
    state.isLoading = true
  },
  [SET_NOT_LOADING] (state) {
    state.isLoading = false
  },
  [SET_MESSAGE] (state, data) {
    state.message = data
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
