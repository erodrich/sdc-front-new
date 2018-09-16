<template>
  <div class="home-page">
    <div class="banner">
      <div class="container">
        <h1>Digicoupon</h1>
        <p>Anuncie aquí, anuncie en todas partes</p>
      </div>
    </div>
    <div class="container">
      <div class="row">
        <div class="col-md-4 sidebar">

        </div>
        <div class="col-md-8">
          <app-campaign-list></app-campaign-list>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import AppCampaignList from '@/components/CampaignList'

export default {
    name: 'HomeGlobal',
    components: {
        AppCampaignList
    }
}
</script>
