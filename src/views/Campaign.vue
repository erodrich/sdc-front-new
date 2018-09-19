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
          <div v-if="!campaignId" class="row">
            <app-campaign-list></app-campaign-list>
          </div>
            <app-campaign-show v-else :id="id"></app-campaign-show>
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
        AppCampaignShow,
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