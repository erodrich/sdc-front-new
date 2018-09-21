<template>
  <div class="campaigns-page">
    <div class="header">
      <div class="container">
        <h1>Beacons</h1>
        <p>Compruebe los beacons que tiene disponibles</p>
      </div>
    </div>
    <div class="container">
      <div class="row">
        <div class="col-md-3">
            <app-sidebar></app-sidebar>
        </div>
        <div class="col-md-9">
            <app-beacons></app-beacons>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import AppSidebar from '@/components/TheSidebar'
import AppBeacons from '@/components/BeaconsList'

export default {
    name: 'Beacons',
    components: {
        AppSidebar,
        AppBeacons,
    }
    
}
</script>
