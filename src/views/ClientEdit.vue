<template>
    <div class="container">
        <div class="card">
            <div class="card-header">
                <h5 class="d-flex justify-content-between align-items-center">
                    Nuevo Cliente
                </h5>
            </div>
            <div class="card-body">
                <form @submit.stop.prevent="handleSubmit">
                    <div class="form-group row" :class="{invalid: $v.newClient.name.$error}">
                        <label class="col-sm-2 col-form-label">Nombre: </label>
                        <div class="col-sm-10">
                            <input type="text"
                                   class="form-control"
                                   placeholder="Nombre de Cliente"
                                   @blur="$v.newClient.name.$touch()"
                                   v-model="newClient.name">
                        </div>
                    </div>
                    <div class="form-group row" :class="{invalid: $v.newClient.ruc.$error}">
                        <label class="col-sm-2 col-form-label">Ruc: </label>
                        <div class="col-sm-10">
                            <input type="text"
                                   class="form-control"
                                   placeholder="Ruc"
                                   @blur="$v.newClient.ruc.$touch()"
                                   v-model="newClient.ruc">
                        </div>
                    </div>
                    <div class="form-group row">
                        <label class="col-sm-2 col-form-label">Datos Adicionales: </label>
                        <div class="col-sm-10">
                            <input type="text"
                                   class="form-control"
                                   placeholder=""
                                   v-model="newClient.description">
                        </div>
                    </div>
                    <div class="form-group row justify-content-center">
                        <div class="col-sm-3 ">
                            <button type="submit" class="btn btn-info w-100">Guardar</button>
                        </div>
                        <div class="col-sm-3 ">
                            <router-link
                                    :to="{ name: 'clients' }"
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
  FETCH_CLIENTS,
  CLIENT_NEW,
  CLIENT_EDIT,
  MARK_AS_LOADING,
  MARK_AS_NOT_LOADING
} from '@/store/actions.type'
import {required} from 'vuelidate/lib/validators'
import {mapGetters} from 'vuex'
import Datepicker from 'vuejs-datepicker'
import {es} from 'vuejs-datepicker/dist/locale'

export default {
  name: 'ClientEdit',
  data () {
    return {
      newClient: {
        ruc: '',
        description: '',
        name: ''
      },
      editFlag: false,
      es: es,
      bootstrapStyling: true
    }
  },
  props: ['id'],
  components: {
    Datepicker
  },
  validations: {
    newClient: {
      name: {
        required
      },
      ruc: {
        required
      }
    }
  },
  computed: {
    ...mapGetters(['client', 'clients'])
  },
  created () {
    if (this.id) {
      this.editFlag = true
      this.fetchClient()
    }
  },
  methods: {
    handleSubmit () {
      this.$store.dispatch(MARK_AS_LOADING)
      if (this.editFlag) {
        this.$store.dispatch(CLIENT_EDIT, this.newClient)
          .then(res => {
            this.$store.dispatch(MARK_AS_NOT_LOADING)
            console.log(res)
            this.$router.push({name: 'clients', params: {id: res.data.id}})
          })
          .catch(error => {
            console.log(error)
            this.$store.dispatch(MARK_AS_NOT_LOADING)
          })
      } else {
        this.$store.dispatch(CLIENT_NEW, this.newClient)
          .then(res => {
            this.$store.dispatch(MARK_AS_NOT_LOADING)
            console.log(res)
            this.$router.push({name: 'clients', params: {id: res.data.id}})
          })
          .catch(error => {
            console.log(error)
            this.$store.dispatch(MARK_AS_NOT_LOADING)
          })
      }
    },
    fetchClient () {
      this.$store.dispatch(FETCH_CLIENTS, this.id)
        .then(res => {
          console.log(this.client)
          this.newClient = this.client
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
