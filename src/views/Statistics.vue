<template>
    <div class="container">
        <div class="card">
            <div class="card-header">
                <h5 class="d-flex justify-content-between align-items-center">
                    Estadísticas
                </h5>
            </div>
            <div class="card-body">
                <app-statistics-list></app-statistics-list>
            </div>
        </div>
    </div>
</template>
<script>
import AppStatisticsList from '@/components/StatisticsList'
import Dashboard from '@/components/Dashboard'

export default {
  name: 'Statistics',
  components: {
    AppStatisticsList,
    Dashboard
  }

}
</script>
