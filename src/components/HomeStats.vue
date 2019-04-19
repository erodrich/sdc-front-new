<template>
    <div class="card">
        <div class="card-header">
            <h5 class="card-title">Estadísticas</h5>
        </div>
        <div class="card-body">
            <div class="row">
                <div class="col-sm-6 col-md-8 col-lg-8">
                    <div class="card text-center" style="margin-left: -5px">
                        <DoughnutChart v-if="chartData"
                                ref="skills_chart"
                                :chart-data="chartData"
                                :options="options">
                        </DoughnutChart>
                        <p class="h3">Anuncios</p>
                    </div>
                </div>
            </div>
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
import DoughnutChart from '@/components/lib/DoughnutChart'

const options = {
  responsive: true,
  maintainAspectRatio: false,
  animation: {
    animateRotate: false
  }
}

export default {
  name: 'AppHomeStats',
  data () {
    return {
      options,
      chartData: null
    }
  },
  components: {
    DoughnutChart
  },
  computed: {
    ...mapGetters([
      'overview'
    ])
  },
  mounted () {
    this.fetchOverview()
  },
  methods: {
    fetchOverview () {
      this.$store.dispatch(FETCH_OVERVIEW)
        .then(() => {
          this.fetchStatistics()
        })
        .catch((error) => {
          console.log(error)
        })
    },
    sleepFetch () {
      setTimeout(this.fetchOverview, 800)
    },
    fetchStatistics () {
      let chartData = {
        labels: ['Vistos', 'Notificados', 'No notificados'],
        datasets: [
          {
            backgroundColor: [
              'rgba(220, 40, 100, 0.8)',
              'rgba(40, 124, 220, 0.8)',
              'rgba(5, 125, 132, 0.8)'],
            data: [
              10, 10, 30
            ]
          }
        ]
      }
      let inData = [
        this.overview.viewed_ads,
        this.overview.notified_ads,
        this.overview.total_ads - (this.overview.viewed_ads + this.overview.notified_ads)
      ]
      chartData.datasets[0].data[0] = inData[0]
      chartData.datasets[0].data[1] = inData[1]
      chartData.datasets[0].data[2] = inData[2]

      this.chartData = chartData
    }
  }
}
</script>
<style>
    #thumbs {
        margin: 10px auto;
    }

</style>
