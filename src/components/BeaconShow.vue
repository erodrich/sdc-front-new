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
                        <dt class="col-sm-3">ID:</dt>
                        <dd class="col-sm-9">{{ beacon.hw_id }}</dd>
                        <dt class="col-sm-3">Alias:</dt>
                        <dd class="col-sm-9">{{ beacon.alias }}</dd>
                        <dt class="col-sm-3">Descripción:</dt>
                        <dd class="col-sm-9">{{ beacon.ubicacion }}</dd>
                    </dl>
                </div>
                <div class="card-footer">
                    <div class="form-group row justify-content-center">
                        <div class="col-sm-3 ">
                            <router-link
                                    :to="{ name: 'adminBeacons' }"
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
  FETCH_ALL_BEACONS
} from '@/store/actions.type'
import {mapGetters} from 'vuex'

export default {
  name: 'AppBeaconShow',
  data () {
    return {}
  },
  props: ['id'],
  computed: {
    ...mapGetters(['beacon'])
  },
  created () {
    this.fetchBeacon()
  },
  methods: {
    fetchBeacon () {
      return this.$store
        .dispatch(FETCH_ALL_BEACONS, this.id)
        .catch(error => {
          this.error = error
        })
    }
  }
}
</script>
<style>

</style>
