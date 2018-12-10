<template>
    <div class="container">
        <div class="title p-2 pl-3">
            <h3>Resumen</h3>
        </div>
        <app-home-stats></app-home-stats>
    </div>
</template>
<script>
import AppSidebar from '@/components/TheSidebar'
import AppHomeStats from '@/components/HomeStats'

export default {
  name: 'HomeGlobal',
  components: {
    AppSidebar,
    AppHomeStats
  }
}
</script>
<style>

</style>
