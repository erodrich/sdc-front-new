<template>
    <div class="card">
        <div class="card-header">
            <h5 class="card-title">Estadísticas</h5>
        </div>
        <div class="card-body">
            <div class="card-deck">
                <div class="col-sm-6 col-md-4 col-lg-4">
                    <div class="card text-center" style="margin-left: -5px">
                        <img id="thumbs" src="@/assets/images/campaigns_thumb.png" width="100"  alt="Campañas activas">
                        Total Campañas:
                        <p class="h3">{{ overview.total_campaigns }}</p>
                    </div>
                </div>
                <div class="col-sm-6 col-md-4 col-lg-4">
                    <div class="card text-center" style="margin-left: -5px">
                        <img id="thumbs" src="@/assets/images/ads_thumb.png" width="100"  alt="Anuncios">
                        Total Anuncios:
                        <p class="h3">{{ overview.total_ads }}</p>
                    </div>
                </div>
                <div class="col-sm-6 col-md-4 col-lg-4">
                    <div class="card text-center" style="margin-left: -5px">
                        <img id="thumbs" src="@/assets/images/report_thumb.png" width="100"  alt="Reportes">
                        Campañas Activas
                        <p class="h3">{{ overview.active_campaigns }}</p>
                    </div>
                </div>
            </div>
        </div>
    </div>

</template>
<script>
import { mapGetters } from 'vuex'
import {FETCH_OVERVIEW} from '@/store/actions.type'

export default {
  name: 'AppHomeStats',
  data () {
    return {
      totalCampaigns: 10,
      totalAds: 15,
      totalReports: 0
    }
  },
  computed: {
    ...mapGetters([
      'overview',
    ])
  },
  created () {
    this.fetchOverview()
  },
  methods: {
    fetchOverview () {
      this.$store.dispatch(FETCH_OVERVIEW)
    }
  }
}
</script>
<style>
#thumbs {
    margin: 10px auto;
}

</style>
