<template>
    <div class="container">
        <div class="title p-2 pl-3">
            <h3>Resumen</h3>
        </div>
        <app-home-stats></app-home-stats>
    </div>
</template>
<script>
import AppHomeStats from '@/components/HomeStats'

export default {
  name: 'HomeGlobal',
  components: {
    AppHomeStats
  }
}
</script>
<style>

</style>
