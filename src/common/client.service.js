const CLIENT_ID = 'id_client'

export default {
  getClientId () {
    return window.localStorage.getItem(CLIENT_ID)
  },

  saveClient (client_id) {
    window.localStorage.setItem(CLIENT_ID, client_id)
  },

  destroyClient () {
    window.localStorage.removeItem(CLIENT_ID)
  }
}
