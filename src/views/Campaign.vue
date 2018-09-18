<template>
  <div class="campaigns-page">
    <div class="header">
      <div class="container">
        <h1>Campañas</h1>
        <p>Organice sus anuncios en campañas y asigne la campaña a un beacon</p>
      </div>
    </div>
    <div class="container">
      <div class="row">
        <div class="col-md-3">
          <app-sidebar></app-sidebar>
        </div>
        <div class="col-md-9">
            <app-campaign-list v-if="!campaignId"></app-campaign-list>
            <app-campaign-show :id="id" v-else></app-campaign-show>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import AppSidebar from '@/components/TheSidebar'
import AppCampaignList from '@/components/CampaignList'
import AppCampaignShow from '@/components/CampaignShow'

export default {
    name: 'Campaign',
    data() {
      return {
        id: ''
      }
    },
    components: {
        AppSidebar,
        AppCampaignList,
        AppCampaignShow
    },
    computed: {
        campaignId() {
          if(this.$route.params.id){
            this.id = this.$route.params.id
            return true
          } else {
            return false
          }
        }
    }
}
</script>