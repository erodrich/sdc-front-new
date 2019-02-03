<template>
    <div>
        <div class="clientshow">
            <div class="card">
                <div class="card-header">
                    <h5 class="d-flex justify-content-between align-items-center">
                        Datos de Cliente
                    </h5>
                </div>
                <div class="card-body">
                    <dl class="row">
                        <dt class="col-sm-3">Cliente:</dt>
                        <dd class="col-sm-9">{{ client.name }}</dd>
                        <dt class="col-sm-3">Ruc:</dt>
                        <dd class="col-sm-9">{{ client.ruc }}</dd>
                        <dt class="col-sm-3">Descripción:</dt>
                        <dd class="col-sm-9">{{ client.description }}</dd>
                    </dl>
                </div>
                <div class="card-footer">
                    <div class="form-group row justify-content-center">
                        <div class="col-sm-3 ">
                            <router-link
                                    :to="{ name: 'clients' }"
                                    tag="button"
                                    class="btn-sm btn-danger btn-block">Volver
                            </router-link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

</template>
<script>
import {
  FETCH_CLIENTS
} from '@/store/actions.type'
import {mapGetters} from 'vuex'

export default {
  name: 'AppClientShow',
  data () {
    return {}
  },
  props: ['id'],
  computed: {
    ...mapGetters(['client'])
  },
  created () {
    this.fetchClients()
  },
  methods: {
    fetchClients () {
      return this.$store
        .dispatch(FETCH_CLIENTS, this.id)
        .catch(error => {
          this.error = error
        })
    }
  }
}
</script>
<style>

</style>
