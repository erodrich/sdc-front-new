<template>
<div class="campaignlist">
    <div class="card">
        <div class="card-header">
                <h5 class="d-flex justify-content-between align-items-center">
                    Campañas
                    <b-btn v-b-modal.modalNewCampaign @click="editFlag=false"><i class="ion-plus"></i></b-btn>
                </h5>
        </div>
        <div class="card-body">
            <table class="table table-hover">
                <thead>
                    <th>Nombre</th>
                    <th>Inicio</th>
                    <th>Fin</th>
                    <th>Activa</th>
                    <th></th>
                </thead>
                <tbody>
                    <tr v-for="(campaign) in campaigns" :key="campaign.id">
                        <router-link
                            :to="{ name: 'campaign', params: { id: campaign.id } }"
                            tag="td">
                            <a>{{campaign.name}}</a>
                        </router-link>
                        <td>{{campaign.start_date}}</td>
                        <td>{{campaign.end_date}}</td>
                        <td class="text-center">
                            <i v-if="campaign.active" class="ion-checkmark"></i>
                            <i v-else class="ion-close"></i>
                        </td>
                        <td>
                            <b-btn v-b-modal.modalNewCampaign variant="outline-secondary" @click="prepareEdit(campaign)"><i class="ion-edit"></i></b-btn>
                            <button type="button" class="btn btn-outline-secondary" @click="deleteCampaign(campaign.id)"><i class="ion-android-delete"></i></button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>

    <!-- Modal Component -->
    <b-modal id="modalNewCampaign"
             ref="modal"
             title="Nueva campaña"
             @ok="handleOk"
             @shown="atShown">
      <form @submit.stop.prevent="handleSubmit">
        <div class="form-group" :class="{invalid: $v.name.$error}">
            <label>Nombre de Campaña</label>
            <input type="text"
                  class="form-control"
                  placeholder="Nombre de campaña"
                  @blur="$v.name.$touch()"
                  v-model="name">
        </div>
        <div class="form-group">
            <label>Vigente desde:</label>
            <datepicker
                v-model="startDate"
                placeholder="Fecha Inicio"
                format="yyyy-MM-dd"
                :bootstrap-styling="bootstrapStyling"
                :language="es"
                input-class="date"
                >
            </datepicker>
        </div>
        <div class="form-group">
            <label>Vigente hasta:</label>
            <datepicker
                v-model="endDate"
                placeholder="Fecha Fin"
                format="yyyy-MM-dd"
                :bootstrap-styling="bootstrapStyling"
                :language="es"
                input-class="date"
                >
            </datepicker>
        </div>
        <div class="form-check">
            <input class="form-check-input" type="radio" name="exampleRadios1" v-model="active" v-bind:value="false">
            <label class="form-check-label" for="exampleRadios1">
                Deshabilitar
            </label>
        </div>
        <div class="form-check">
            <input class="form-check-input" type="radio" name="exampleRadios2" v-model="active" v-bind:value="true">
            <label class="form-check-label" for="exampleRadios2">
                Habilitar
            </label>
        </div>
      </form>
    </b-modal>

</div>

</template>
<script>
import {
  FETCH_CAMPAIGNS,
  CAMPAIGN_NEW,
  CAMPAIGN_DELETE,
  CAMPAIGN_EDIT
} from '@/store/actions.type'
import {required} from 'vuelidate/lib/validators'
import { mapGetters } from 'vuex'
import Datepicker from 'vuejs-datepicker'
import { es } from 'vuejs-datepicker/dist/locale'

export default {
  name: 'CampaignList',
  data () {
    return {
      newCampaign: {},
      name: '',
      start_date: '',
      end_date: '',
      active: false,
      client_id: '',
      editFlag: false,
      es: es,
      bootstrapStyling: true,
      startDate: new Date(),
      endDate: new Date()
    }
  },
  components: {
    Datepicker
  },
  validations: {
    name: {
      required
    }
  },
  computed: {
    ...mapGetters(['campaigns', 'getClientId'])
  },
  created () {
    this.fetchCampaigns()
  },
  methods: {
    fetchCampaigns () {
      this.$store.dispatch(FETCH_CAMPAIGNS)
    },
    prepareEdit (campaign) {
      this.editFlag = true
      this.newCampaign = Object.assign({}, campaign)
      this.startDate = new Date(`${this.start_date}<`)
      this.endDate = new Date(`${this.end_date}<`)
    },
    atShown () {
      if (!this.editFlag) {
        this.clearNewCampaign()
      }
    },
    handleOk (evt) {
      evt.preventDefault()
      this.handleSubmit()
      this.fetchCampaigns()
    },
    handleSubmit () {
      this.newCampaign.client_id = this.getClientId
      this.newCampaign.start_date = this.startDate.toLocaleDateString('fr-CA')
      this.newCampaign.end_date = this.endDate.toLocaleDateString('fr-CA')
      this.newCampaign.name = this.name
      this.newCampaign.active = this.active
      if (!this.editFlag) {
        this.$store.dispatch(CAMPAIGN_NEW, this.newCampaign)
          .then(res => this.fetchCampaigns())
      } else {
        this.$store.dispatch(CAMPAIGN_EDIT, this.newCampaign)
          .then(res => this.fetchCampaigns())
      }
      this.$refs.modal.hide()
    },
    clearNewCampaign () {
      this.newCampaign.name = ''
      this.newCampaign.start_date = ''
      this.newCampaign.end_date = ''
      this.newCampaign.active = ''
    },
    deleteCampaign (id) {
      if (confirm('Seguro que desea eliminar esta campaña?')) {
        this.$store.dispatch(CAMPAIGN_DELETE, id)
          .then(res => this.fetchCampaigns())
      }
      this.fetchCampaigns()
    },
    isActive (v) {
      return v === 1
    }
  }
}
</script>
<style>
.invalid input {
  border: 1px solid red;
  background-color:#ffd7c7;
}
</style>
