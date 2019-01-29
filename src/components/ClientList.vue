<template>

    <table v-if='clients' class="table table-hover mt-1">
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

</template>
<script>
import {
  FETCH_CLIENTS
} from '@/store/actions.type'
import {mapGetters} from 'vuex'

export default {
  name: 'ClientList',
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
      this.$store.dispatch(FETCH_CLIENTS)
    },
  }
}

</script>
