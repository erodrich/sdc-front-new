import { BeaconsService } from '@/common/api.service'
import { FETCH_BEACONS, BEACON_UPDATE } from '@/store/actions.type'
import { SET_BEACONS, PURGE_BEACON } from '@/store/mutations.type'

const state = {
    beacons: [],
    beacon: {}
}
const getters = {
    beacons(state) {
        return state.beacons
    },
    beacon(state) {
        return state.beacon
    }
}
const actions = {
    [FETCH_BEACONS] (context, id = '') {
        return BeaconsService
        .get(context.rootGetters.getClientId, id)
        .then(( response ) => {
            console.log(response.data)
            context.commit(SET_BEACONS, response.data)
        })
        .catch((error) => {
            throw new Error(error)
        })
    },
    [BEACON_UPDATE] (context, data) {
        return BeaconsService
        .update(data.id, data)
        .then((response) => {
            console.log(response.data)
        })
        .catch((error) => {
            console.log('Error')
            throw new Error(error)
        })
    }
}
const mutations = {
    [SET_BEACONS] (state, data) {
        state.beacons = []
        data = data.data
        if(data instanceof Array){
            var i;
            for(i = 0; i < data.length; i++){
                const beacon = {
                    id: data[i].id,
                    hw_id: data[i].attributes.hw_id,
                    alias: data[i].attributes.alias,
                    ubicacion: data[i].attributes.ubicacion,
                    created_at: data[i].attributes.created_at,
                    available: data[i].attributes.campaign ? false : true,
                }
                state.beacons.push(beacon)
            }
        } else {
            const beacon = {
                id: data.id,
                hw_id: data.attributes.hw_id,
                alias: data.attributes.alias,
                ubicacion: data.attributes.ubicacion,
                created_at: data.attributes.created_at,
            }
            state.beacon = beacon
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