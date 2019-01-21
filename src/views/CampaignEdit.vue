<template>
    <div class="container">
        <div class="card">
            <div class="card-header">
                <h5 class="d-flex justify-content-between align-items-center">
                    Nueva campaña
                </h5>
            </div>
            <div class="card-body">
                <form @submit.stop.prevent="handleSubmit">
                    <div class="form-group row" :class="{invalid: $v.newCampaign.name.$error}">
                        <label class="col-sm-2 col-form-label">Nombre: </label>
                        <div class="col-sm-10">
                            <input type="text"
                                   class="form-control"
                                   placeholder="Nombre de campaña"
                                   @blur="$v.newCampaign.name.$touch()"
                                   v-model="newCampaign.name">
                        </div>
                    </div>
                    <div class="form-group row">
                        <label for="inputDesde" class="col-sm-2 col-form-label">Desde: </label>
                        <div class="col-sm-10">
                            <datepicker
                                    v-model="startDate"
                                    placeholder="Fecha Inicio"
                                    format="yyyy-MM-dd"
                                    id="inputDesde"
                                    :bootstrap-styling="bootstrapStyling"
                                    :language="es"
                                    input-class="date"
                            >
                            </datepicker>
                        </div>
                    </div>
                    <div class="form-group row">
                        <label for="inputHasta" class="col-sm-2 col-form-label">Hasta: </label>
                        <div class="col-sm-10">
                            <datepicker
                                    v-model="endDate"
                                    placeholder="Fecha Fin"
                                    format="yyyy-MM-dd"
                                    id="inputHasta"
                                    :bootstrap-styling="bootstrapStyling"
                                    :language="es"
                                    input-class="date"
                            >
                            </datepicker>
                        </div>
                    </div>
                    <fieldset class="form-group">
                        <div class="row">
                            <legend class="col-form-label col-sm-2 pt-0">Activar?</legend>
                            <div class="col-sm-10">
                                <div class="form-check">
                                    <input class="form-check-input" type="radio" name="gridRadios" id="gridRadios1"
                                           v-model="newCampaign.active"
                                           v-bind:value="true" checked>
                                    <label class="form-check-label" for="gridRadios1">
                                        Si
                                    </label>
                                </div>
                                <div class="form-check">
                                    <input class="form-check-input" type="radio" name="gridRadios" id="gridRadios2"
                                           v-model="newCampaign.active"
                                           v-bind:value="false">
                                    <label class="form-check-label" for="gridRadios2">
                                        No
                                    </label>
                                </div>
                            </div>
                        </div>
                    </fieldset>
                    <div class="form-group row justify-content-center">
                        <div class="col-sm-3 ">
                            <button type="submit" class="btn btn-info w-100">Guardar</button>
                        </div>
                        <div class="col-sm-3 ">
                            <router-link
                                    :to="{ name: 'campaign' }"
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
  FETCH_CAMPAIGNS,
  CAMPAIGN_NEW,
  CAMPAIGN_EDIT,
  MARK_AS_LOADING,
  MARK_AS_NOT_LOADING
} from '@/store/actions.type'
import { SET_MESSAGE } from '@/store/mutations.type'
import {required} from 'vuelidate/lib/validators'
import {mapGetters} from 'vuex'
import Datepicker from 'vuejs-datepicker'
import {es} from 'vuejs-datepicker/dist/locale'

export default {
  name: 'CampaignEdit',
  data () {
    return {
      newCampaign: {
        client_id: '',
        start_date: '',
        end_date: '',
        name: '',
        active: false
      },
      editFlag: false,
      es: es,
      bootstrapStyling: true,
      startDate: new Date(),
      endDate: new Date()
    }
  },
  props: ['id'],
  components: {
    Datepicker
  },
  validations: {
    newCampaign: {
      name: {
        required
      }
    }
  },
  computed: {
    ...mapGetters(['campaign', 'campaigns', 'getClientId'])
  },
  created () {
    if (this.id) {
      this.editFlag = true
      this.fetchCampaign()
    }
  },
  methods: {
    handleSubmit () {
      this.$store.dispatch(MARK_AS_LOADING)
      this.newCampaign.client_id = this.getClientId
      this.newCampaign.start_date = this.startDate.toLocaleDateString('fr-CA')
      this.newCampaign.end_date = this.endDate.toLocaleDateString('fr-CA')
      if (this.editFlag) {
        this.$store.dispatch(CAMPAIGN_EDIT, this.newCampaign)
          .then(res => {
            this.$store.dispatch(MARK_AS_NOT_LOADING)
            console.log(res)
            this.$router.push({name: 'campaign', params: {id: res.data.id}})
          })
          .catch(error => {
            console.log(error)
            this.$store.dispatch(MARK_AS_NOT_LOADING)
          })
      } else {
        this.$store.dispatch(CAMPAIGN_NEW, this.newCampaign)
          .then(res => {
            this.$store.dispatch(MARK_AS_NOT_LOADING)
            console.log(res)
            this.$router.push({name: 'campaign', params: {id: res.data.id}})
          })
          .catch(error => {
            console.log(error)
            this.$store.dispatch(MARK_AS_NOT_LOADING)
          })
      }
    },
    fetchCampaign () {
      this.$store.dispatch(FETCH_CAMPAIGNS, this.id)
        .then(res => {
          console.log(this.campaign)
          this.newCampaign = this.campaign
          this.startDate = new Date(`${this.campaign.start_date}<`)
          this.endDate = new Date(`${this.campaign.end_date}<`)
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
