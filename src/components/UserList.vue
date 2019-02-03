<template>
    <table v-if='users' class="table table-hover mt-1">
        <thead>
        <th>Nombre</th>
        <th>Email</th>
        <th>Id Cliente</th>
        <th></th>
        <slot name="extra-th"></slot>
        </thead>
        <tbody>
        <tr v-for="(user) in users" :key="user.id">
            <router-link
                    :to="{ name: 'users', params: { id: user.id } }"
                    tag="td">
                <a>{{user.name}}</a>
            </router-link>
            <td>{{user.ruc}}</td>
            <td>{{user.description}}</td>
            <td>
                <slot name="options" :user="user"></slot>
            </td>
            <slot name="extra-td"></slot>
        </tr>
        </tbody>
    </table>

</template>
<script>
import {
  FETCH_USERS
} from '@/store/actions.type'
import {mapGetters} from 'vuex'

export default {
  name: 'UserList',
  computed: {
    ...mapGetters([
      'users'
    ])
  },
  created () {
    this.fetchUsers()
  },
  methods: {
    fetchUsers () {
      this.$store.dispatch(FETCH_USERS)
    },
  }
}

</script>
