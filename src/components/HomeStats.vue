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
                        Campañas Activas:
                        <p class="h3">{{ totalCampaigns }}</p>
                    </div>
                </div>
                <div class="col-sm-6 col-md-4 col-lg-4">
                    <div class="card text-center" style="margin-left: -5px">
                        <img id="thumbs" src="@/assets/images/ads_thumb.png" width="100"  alt="Anuncios">
                        Anuncios:
                        <p class="h3">{{ totalAds }}</p>
                    </div>
                </div>
                <div class="col-sm-6 col-md-4 col-lg-4">
                    <div class="card text-center" style="margin-left: -5px">
                        <img id="thumbs" src="@/assets/images/report_thumb.png" width="100"  alt="Reportes">
                        Reportes
                        <p class="h3">{{ totalReports }}</p>
                    </div>
                </div>
            </div>
        </div>
    </div>

</template>
<script>

export default {
  name: 'AppHomeStats',
  data () {
    return {
      totalCampaigns: 10,
      totalAds: 15,
      totalReports: 0
    }
  },
  created () {

  },
  methods: {

  }
}
</script>
<style>
#thumbs {
    margin: 10px auto;
}

</style>
