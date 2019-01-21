import {SET_MESSAGE, UNSET_MESSAGE} from '@/store/mutations.type'
import {REPORT_ALERT, PURGE_MESSAGE} from '@/store/actions.type'

const state = {
  alerta: '',
  type: ''
}

const getters = {
  alerta(state) {
    return state.alerta
  },
  type(state) {
    return state.type
  }
}

const actions = {
  [REPORT_ALERT] (context, data) {
    context.commit(SET_MESSAGE, data)
  },
  [PURGE_MESSAGE] (context, data) {
    context.commit(UNSET_MESSAGE)
  }

}

const mutations = {
  [SET_MESSAGE] (state, data) {
    state.alerta = data.attributes.message
    state.type = data.type
  },
  [UNSET_MESSAGE] (state) {
    state.alerta = null
    state.type = null
  }
}

export default {
  state,
  actions,
  mutations,
  getters
}
