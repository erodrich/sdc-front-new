<template>
    <div class="container">
        <div class="card">
            <div class="card-header">
                <h5 class="d-flex justify-content-between align-items-center">
                    Nuevo Beacon
                </h5>
            </div>
            <div class="card-body">
                <form @submit.stop.prevent="handleSubmit">
                    <div class="form-group row" :class="{invalid: $v.newBeacon.hw_id.$error}">
                        <label class="col-sm-2 col-form-label">ID:</label>
                        <div class="col-sm-10">
                            <input type="text"
                                   class="form-control"
                                   placeholder=""
                                   @blur="$v.newBeacon.hw_id.$touch()"
                                   v-model="newBeacon.hw_id">
                        </div>
                    </div>
                    <div class="form-group row" :class="{invalid: $v.newBeacon.alias.$error}">
                        <label class="col-sm-2 col-form-label">Alias: </label>
                        <div class="col-sm-10">
                            <input type="text"
                                   class="form-control"
                                   placeholder=""
                                   @blur="$v.newBeacon.alias.$touch()"
                                   v-model="newBeacon.alias">
                        </div>
                    </div>
                    <div class="form-group row">
                        <label class="col-sm-2 col-form-label">Ubicación: </label>
                        <div class="col-sm-10">
                            <input type="text"
                                   class="form-control"
                                   placeholder=""
                                   v-model="newBeacon.ubicacion">
                        </div>
                    </div>
                    <div class="form-group row justify-content-center">
                        <div class="col-sm-3 ">
                            <button type="submit" class="btn btn-info w-100">Guardar</button>
                        </div>
                        <div class="col-sm-3 ">
                            <router-link
                                    :to="{ name: 'adminBeacons' }"
                                    tag="button"
                                    class="btn btn-danger btn-block">Cancelar
                            </router-link>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>
<script>
import {
  FETCH_ALL_BEACONS,
  BEACON_NEW,
  BEACON_ADMIN_UPDATE,
  MARK_AS_LOADING,
  MARK_AS_NOT_LOADING
} from '@/store/actions.type'
import {required} from 'vuelidate/lib/validators'
import {mapGetters} from 'vuex'
import {es} from 'vuejs-datepicker/dist/locale'

export default {
  name: 'BeaconEdit',
  data () {
    return {
      newBeacon: {
        hw_id: '',
        alias: '',
        ubicacion: ''
      },
      editFlag: false,
      es: es,
      bootstrapStyling: true
    }
  },
  props: ['id'],
  validations: {
    newBeacon: {
      hw_id: {
        required
      },
      alias: {
        required
      }
    }
  },
  computed: {
    ...mapGetters(['beacon', 'beacons'])
  },
  created () {
    if (this.id) {
      this.editFlag = true
      this.fetchBeacon()
    }
  },
  methods: {
    handleSubmit () {
      this.$store.dispatch(MARK_AS_LOADING)
      if (this.editFlag) {
        this.$store.dispatch(BEACON_ADMIN_UPDATE, this.newBeacon)
          .then(res => {
            this.$store.dispatch(MARK_AS_NOT_LOADING)
            console.log(res)
            this.$router.push({name: 'adminBeacons', params: {id: res.data.id}})
          })
          .catch(error => {
            console.log(error)
            this.$store.dispatch(MARK_AS_NOT_LOADING)
          })
      } else {
        this.$store.dispatch(BEACON_NEW, this.newBeacon)
          .then(res => {
            this.$store.dispatch(MARK_AS_NOT_LOADING)
            console.log(res)
            this.$router.push({name: 'adminBeacons', params: {id: res.data.id}})
          })
          .catch(error => {
            console.log(error)
            this.$store.dispatch(MARK_AS_NOT_LOADING)
          })
      }
    },
    fetchBeacon () {
      this.$store.dispatch(FETCH_ALL_BEACONS, this.id)
        .then(res => {
          console.log(this.beacon)
          this.newBeacon = this.beacon
        })
    }
  }
}

</script>
<style>
    .invalid input {
        border: 1px solid red;
        background-color: #ffd7c7;
    }
</style>
