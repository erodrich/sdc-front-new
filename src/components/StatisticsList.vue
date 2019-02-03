<template>
    <div v-if='interactions.length > 0'>
        <pagination :action="action"></pagination>
        <table class="table table-hover mt-1">
            <thead>
            <th>Número</th>
            <th>Anuncio</th>
            <th>Campaña</th>
            <th>Beacon</th>
            <th>Estado</th>
            <th>Fecha y Hora</th>
            <th></th>
            </thead>
            <tbody>
            <tr v-for="(interaction) in interactions" :key="interaction.id">
                <td>{{interaction.id}}</td>
                <td>{{interaction.ad.title}}</td>
                <td>{{interaction.campaign.name}}</td>
                <td>{{interaction.beacon.id}}</td>
                <td>{{interaction.action}}</td>
                <td>{{interaction.fecha_hora}}</td>
            </tr>
            </tbody>
        </table>
    </div>
    <div v-else>
        No hay datos que mostrar
    </div>

</template>
<script>
import Pagination from '@/components/lib/Pagination'
import {
  FETCH_INTERACTIONS
} from '@/store/actions.type'
import {mapGetters} from 'vuex'

export default {
  name: 'StatisticsList',
  data () {
    return {
      action: FETCH_INTERACTIONS
    }
  },
  components: {
    Pagination
  },
  computed: {
    ...mapGetters([
      'interactions'
    ])
  },
  created () {
    this.fetchInteractions()
  },
  methods: {
    fetchInteractions () {
      this.$store.dispatch(FETCH_INTERACTIONS)
    }
  }
}
</script>
