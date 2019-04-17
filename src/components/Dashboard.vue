<template>
<div class="container">
    <line-chart></line-chart>
</div>
</template>
<script>
import BarChart from '@/components/lib/BarChart'
import LineChart from '@/components/lib/LineChart'

export default {
  name: 'Dashboard',
  components: {
    BarChart,
    LineChart
  }

}

</script>