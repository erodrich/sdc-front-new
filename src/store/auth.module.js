import ApiService from '@/common/api.service'
import JwtService from '@/common/jwt.service'
import ClientService from '@/common/client.service'
import { LOGIN, LOGOUT, REGISTER, CHECK_AUTH, UPDATE_USER, USER_INFO } from './actions.type'
import { SET_AUTH, PURGE_AUTH, SET_ERROR, SET_CURRENT_USER } from './mutations.type'

const state = {
    errors: null,
    user: {},
    client_id: ClientService.getClientId(),
    isAuthenticated: !!JwtService.getToken()
}

const getters = {
    currentUser (state) {
        return state.user
    },
    isAuthenticated (state) {
        return state.isAuthenticated
    },
    getClientId (state) {
        return state.client_id
    },
    getErrors (state) {
        return state.errors
    }
}

const actions = {
    [LOGIN] (context, credentials) {
       return new Promise((resolve) => {
           ApiService
           .post('login', {
               username: credentials.username,
               password: credentials.password
           })
           .then(({data}) => {
               console.log("Data: " + data)
               context.commit(SET_AUTH, data)
               resolve(data)
           })
           .catch((error) => {
               console.log("Response: " + error)
               context.commit(SET_ERROR, error)
           })
       }) 
    },
    [USER_INFO] (context) {
        ApiService.setHeader()
        ApiService
        .get('user')
        .then(({data}) => {
            context.commit(SET_CURRENT_USER, data)
        })
        .catch(({response}) => {
            console.log("Response: " + response)
            context.commit(SET_ERROR, response.data)
        })
    },
    [LOGOUT] (context) {
        ApiService.setHeader()
        ApiService.post('logout')
        .then(({data}) => {
            context.commit(PURGE_AUTH)
            resolve(data)
        })
        .catch(({error}) => {
            context.commit(PURGE_AUTH)
            console.log(error)
        })
        
    },
    [REGISTER] (context, credentials) {
        return new Promise((resolve, reject) => {
            ApiService
            .post('users', {user: credentials})
            .then(({data}) => {
                context.commit(SET_AUTH, data.user)
                resolve(data)
            })
            .catch(({response}) => {
                console.log(response)
                context.commit(SET_ERROR, response.data.errors)
            })
        })
    },
    [CHECK_AUTH] (context) {
        if (JwtService.getToken()) {
          ApiService.setHeader()
          ApiService
            .get('user')
            .then(({data}) => {
                context.commit(SET_CURRENT_USER, data)
            })
            .catch(({response}) => {
              context.commit(PURGE_AUTH)
              context.commit(SET_ERROR, response)
            })
        } else {
            console.log("purging")
          context.commit(PURGE_AUTH)
        }
    },
    [UPDATE_USER] (context, payload) {
        const {email, username, password, image, bio} = payload
        const user = {
          email,
          username,
          bio,
          image
        }
        if (password) {
          user.password = password
        }
    
        return ApiService
          .put('user', user)
          .then(({data}) => {
            context.commit(SET_AUTH, data.user)
            return data
        })
    }
}

const mutations = {
    [SET_ERROR] (state, error) {
        state.errors = error
    },
    [SET_CURRENT_USER] (state, user) {
        state.user = user
        state.client_id = user.client_id
        ClientService.saveClient(user.client_id)
    },
    [SET_AUTH] (state, authInfo) {
        state.isAuthenticated = true
        state.errors = {}
        JwtService.saveToken(authInfo.access_token)
    },
    [PURGE_AUTH] (state) {
        state.isAuthenticated = false
        state.user = {}
        state.errors = {}
        state.client_id = null
        JwtService.destroyToken()
        ClientService.destroyClient()
    }
}

export default {
    state,
    actions,
    mutations,
    getters
}