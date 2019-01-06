<template>

    <table class="table table-hover mt-1">
        <thead>
        <th>Nombre</th>
        <th>Inicio</th>
        <th>Fin</th>
        <th>Activa</th>
        <th></th>
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
                <slot :campaign="campaign"></slot>
            </td>
        </tr>
        </tbody>
    </table>

</template>
<script>
import {
  FETCH_CAMPAIGNS,
} from '@/store/actions.type'
import {mapGetters} from 'vuex'

export default {
  name: 'CampaignListNew',
  computed: {
    ...mapGetters([
      'campaigns'
    ])
  },
  created () {
    this.fetchCampaigns()
  },
  methods: {
    fetchCampaigns () {
      this.$store.dispatch(FETCH_CAMPAIGNS)
    }
  }
}

</script>
