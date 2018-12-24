<template>
    <div class="beaconstable">
        <div class="card">
            <div class="card-header">
                <h5>Beacons</h5>
            </div>
            <div class="card-body">
                <div v-for="beacon in beacons" :key="beacon.id">
                    <div class="card" >
                        <div class="card-body">
                            <h5 class="card-title">{{beacon.alias}}</h5>
                            <em class="card-subtitle mb-2 text-muted">Creado: {{beacon.created_at}}</em>
                            <p class="card-text">
                                <ul>

                                    <li>Ubicación: {{beacon.ubicacion}}</li>
                                    <li>Estado: <span v-if="beacon.campaignId"><strong>En uso</strong></span> <span
                                            v-else> Disponible </span></li>
                                </ul>
                            </p>
                            <div v-if="beacon.campaignId">
                                <!-- <p class="card-text">Campaña: {{ campaignNames[beacon.id] }}</p> -->

                                <router-link class="card-link"
                                             active-class="active"
                                             :to="{ name: 'campaign', params: { id: beacon.campaignId} }">
                                    Ir a Campaña
                                </router-link>
                                <a href="#" class="card-link">Another link</a>
                            </div>
                            <div v-else>
                                <router-link class="card-link"
                                             active-class="active"
                                             :to="{ name: 'beaconsSelectCampaign' }">
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
import {FETCH_BEACONS, FETCH_CAMPAIGNS} from '@/store/actions.type'

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
  mounted () {
    this.fetchBeacons()
  },
  methods: {
    fetchBeacons () {
      this.$store.dispatch(FETCH_BEACONS)
        .then(res => {
          this.beacons.forEach(beacon => {
            if(beacon.campaignId) {
              this.$store.dispatch(FETCH_CAMPAIGNS, beacon.campaignId)
                .then(res => {
                  this.campaignNames[beacon.id] = this.campaign.name
                })
            }
          })
        })
    },
  }

}
</script>
