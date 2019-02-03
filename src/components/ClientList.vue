<template>
  <div v-if='clients.length > 0'>
    <pagination :action="action"></pagination>
    <table class="table table-hover mt-1">
        <thead>
        <th>Nombre</th>
        <th>Ruc</th>
        <th>Descripción</th>
        <th></th>
        <slot name="extra-th"></slot>
        </thead>
        <tbody>
        <tr v-for="(client) in clients" :key="client.id">
            <router-link
                    :to="{ name: 'clients', params: { id: client.id } }"
                    tag="td">
                <a>{{client.name}}</a>
            </router-link>
            <td>{{client.ruc}}</td>
            <td>{{client.description}}</td>
            <td>
                <slot name="options" :client="client"></slot>
            </td>
            <slot name="extra-td"></slot>
        </tr>
        </tbody>
    </table>
  </div>
  <div v-else>
    No hay clientes para mostrar
  </div>
</template>
<script>
import Pagination from '@/components/lib/Pagination'
import {
} from '@/store/actions.type'
import {mapGetters} from 'vuex'

export default {
  name: 'ClientList',
  props: ['action'],
  components: {
    Pagination
  },
  computed: {
    ...mapGetters([
      'clients'
    ])
  },
  created () {
    this.fetchClients()
  },
  methods: {
    fetchClients () {
      this.$store.dispatch(this.action)
    },
  }
}

</script>
