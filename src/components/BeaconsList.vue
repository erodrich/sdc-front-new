<template>
<div class="beaconstable">
    <div class="card">
        <div class="card-header">
            <h5>Beacons</h5>
        </div>
        <div class="card-body">
            <table class="table table-hover mt-1">
                <thead>
                    <th>Alias</th>
                    <th>Creado</th>
                </thead>
                <tbody>
                    <tr v-for="beacon in beacons" :key="beacon.id">
                        <td><a @click="view(beacon)">{{beacon.alias}}</a></td>
                        <td>{{beacon.created_at}}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</div>

</template>
<script>
import { mapGetters } from 'vuex';
import { FETCH_BEACONS } from '@/store/actions.type'

export default {
    name: 'BeaconsList',
    computed: {
        ...mapGetters([
            'beacons',
        ])
    },
    mounted(){
        this.fetchBeacons()
    },
    methods: {
        fetchBeacons(){
            this.$store.dispatch(FETCH_BEACONS)
        },
        view(beacon){
            console.log('Aqui muestro el detalle del beacon')
        }
    }

}
</script>
