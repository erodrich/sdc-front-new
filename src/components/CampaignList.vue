<template>
    <div v-if="campaigns.length > 0">
        <pagination :action="action" ></pagination>
        <table class="table table-hover mt-1">
            <thead>
            <th>Nombre</th>
            <th>Inicio</th>
            <th>Fin</th>
            <th>Activa</th>
            <th></th>
            <slot name="extra-th"></slot>
            </thead>
            <tbody>
            <tr v-for="(campaign) in campaigns" :key="campaign.id">
                <router-link
                        :to="{ name: 'campaign', params: { id: campaign.id } }"
                        tag="td">
                    <a>{{campaign.name}}</a>
                </router-link>
                <td>{{campaign.start_date}}</td>
                <td>{{campaign.end_date}}</td>
                <td class="text-center">
                    <i v-if="campaign.active" class="ion-checkmark"></i>
                    <i v-else class="ion-close"></i>
                </td>
                <td>
                    <slot name="options" :campaign="campaign"></slot>
                </td>
                <slot name="extra-td" :campaign="getBeaconId(campaign.beacons)"></slot>
            </tr>
            </tbody>
        </table>
    </div>
    <div v-else>
        No hay campañas para mostrar
    </div>

</template>
<script>
import Pagination from '@/components/lib/Pagination'
import {
  FETCH_CAMPAIGNS,
} from '@/store/actions.type'
import {mapGetters} from 'vuex'

export default {
  name: 'CampaignList',
  props: ['action'],
  computed: {
    ...mapGetters([
      'campaigns'
    ])
  },
  components: {
    Pagination
  },
  created () {
    this.fetchCampaigns()
  },
  methods: {
    fetchCampaigns () {
      this.$store.dispatch(FETCH_CAMPAIGNS)
    },
    getBeaconId (beaconUrl) {
      let id = beaconUrl
      // console.log(id)
    }
  }
}

</script>
