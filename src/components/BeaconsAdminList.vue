<template>
    <div v-if="beacons.length > 0">
        <pagination :action="action" ></pagination>
        <table v-if='beacons' class="table table-hover mt-1">
            <thead>
            <th>ID</th>
            <th>Alias</th>
            <th>Ubicación</th>
            <th></th>
            <slot name="extra-th"></slot>
            </thead>
            <tbody>
            <tr v-for="(beacon) in beacons" :key="beacon.id">
                <router-link
                        :to="{ name: 'adminBeacons', params: { id: beacon.id } }"
                        tag="td">
                    <a>{{beacon.hw_id}}</a>
                </router-link>
                <td>{{beacon.alias}}</td>
                <td>{{beacon.ubicacion}}</td>
                <td>
                    <slot name="options" :beacon="beacon"></slot>
                </td>
                <slot name="extra-td"></slot>
            </tr>
            </tbody>
        </table>
    </div>
    <div v-else>
        No hay usuarios para mostrar
    </div>
</template>
<script>
import {mapGetters} from 'vuex'
import {FETCH_ALL_BEACONS, FETCH_CAMPAIGNS, BEACON_UPDATE} from '@/store/actions.type'
import Pagination from '@/components/lib/Pagination'

export default {
  name: 'BeaconsAdminList',
  data () {
    return {
      beaconCampaigns: [],
      campaignNames: []
    }
  },
  props: ['action'],
  computed: {
    ...mapGetters([
      'beacons',
      'campaign'
    ])
  },
  components: {
    Pagination
  },
  created () {
    this.fetchBeacons()
  },
  methods: {
    fetchBeacons () {
      this.$store.dispatch(FETCH_ALL_BEACONS)
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
