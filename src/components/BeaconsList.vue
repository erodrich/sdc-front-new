<template>
    <div class="beaconstable">
        <div class="card">
            <div class="card-header">
                <h5>Beacons</h5>
            </div>
            <div class="card-body">
                <div v-for="(beacon) in beacons" :key="beacon.id">
                    <div class="card" >
                        <div class="card-body">
                            <h5 class="card-title">{{ beacon.alias }}</h5>
                            <em class="card-subtitle mb-2 text-muted">Creado: {{ beacon.created_at }}</em>
                            <p class="card-text">
                                <ul>

                                    <li>Ubicación: {{beacon.ubicacion}}</li>
                                    <li>Estado: <span v-if="beacon.campaign_id"><strong>En uso</strong></span> <span
                                            v-else> Disponible </span></li>
                                </ul>
                            </p>
                            <div v-if="beacon.campaign_id">
                                <!-- <p class="card-text">Campaña: {{ campaignNames[beacon.campaign_id] }}</p> -->

                                <router-link class="card-link"
                                             active-class="active"
                                             :to="{ name: 'campaign', params: { id: beacon.campaign_id } }">
                                    Ir a Campaña
                                </router-link>
                                <router-link class="card-link"
                                             active-class="active"
                                             :to="{ name: 'beaconsSelectCampaign', params: { id: beacon.id } }">
                                    Cambiar Campaña
                                </router-link>
                                <a href="#" class="card-link" @click="selectNone(beacon.id)">Ninguna Campaña</a>
                            </div>
                            <div v-else>
                                <router-link class="card-link"
                                             active-class="active"
                                             :to="{ name: 'beaconsSelectCampaign', params: { id: beacon.id } }">
                                    Seleccionar Campaña
                                </router-link>
                            </div>


                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

</template>
<script>
import {mapGetters} from 'vuex'
import {FETCH_BEACONS, FETCH_CAMPAIGNS, BEACON_UPDATE} from '@/store/actions.type'

export default {
  name: 'BeaconsList',
  data () {
    return {
      beaconCampaigns: [],
      campaignNames: []
    }
  },
  computed: {
    ...mapGetters([
      'beacons',
      'campaign'
    ])
  },
  created () {
    this.fetchBeacons()
  },
  methods: {
    fetchBeacons () {
      this.$store.dispatch(FETCH_BEACONS)
        .then(res => {
          this.beacons.forEach(beacon => {
            if (beacon.campaign_id) {
              this.$store.dispatch(FETCH_CAMPAIGNS, beacon.campaign_id)
                .then(res => {
                  this.campaignNames[beacon.campaign_id] = this.campaign.name
                })
            }
          })
        })
    },
    selectNone (beaconId) {
      let updateBeacon = {}
      this.beacons.forEach( (beacon) => {
        if(beacon.id === beaconId){
          updateBeacon = beacon
        }
      })
      updateBeacon.campaign_id = null
      this.$store.dispatch(BEACON_UPDATE, updateBeacon)
    }
  }

}
</script>
