<template>
  <div class="home-page">
    <div class="header">
      <div class="container">
        <h1>Digicoupon</h1>
        <p>Anuncie aquí, anuncie en todas partes</p>
      </div>
    </div>
    <div class="container">
      <div class="row">
        <div class="col-md-3">
          <app-sidebar></app-sidebar>
        </div>
        <div class="col-md-9">
          <app-home-stats></app-home-stats>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import AppSidebar from '@/components/TheSidebar'
import AppHomeStats from '@/components/HomeStats'

export default {
    name: 'HomeGlobal',
    components: {
        AppSidebar,
        AppHomeStats,
    }
}
</script>
