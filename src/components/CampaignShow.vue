<template>
    <div>
        <div v-if="error">
            <app-error-view :error="error"></app-error-view>
        </div>
        <div v-else>
            <div class="campaignshow">
                <div class="card">
                    <div class="card-header">
                        <h5 class="d-flex justify-content-between align-items-center">
                            Datos de Campaña
                            <button type="button" class="btn btn-secondary" @click="toggleDatosCampaña()">
                                <i :class="showDatosCampaña ? 'ion-chevron-up' : 'ion-chevron-down'"></i>
                            </button>
                        </h5>
                    </div>
                    <div v-if="showDatosCampaña" class="card-body">
                        <dl class="row">
                            <dt class="col-sm-3">Campaña:</dt>
                            <dd class="col-sm-9">{{ campaign.name }}</dd>
                            <dt class="col-sm-3">Fecha Inicio:</dt>
                            <dd class="col-sm-9">{{ campaign.start_date }}</dd>
                            <dt class="col-sm-3">Fecha Fin:</dt>
                            <dd class="col-sm-9">{{ campaign.end_date }}</dd>
                            <dt class="col-sm-3">Estado:</dt>
                            <dd class="col-sm-9">
                                {{campaign.active == 1 ? 'Activo' : 'Inactivo'}}
                            </dd>
                            <template v-if="beacon.id">
                                <dt class="col-sm-3">Beacon:</dt>
                                <dd class="col-sm-9">{{ beacon.alias }}</dd>
                            </template>
                        </dl>
                    </div>
                    <div class="card-footer">
                        <div class="form-group row justify-content-center">
                            <div class="col-sm-3 ">
                                <router-link class="btn btn-sm btn-primary btn-block"
                                             :to="{ name: 'adForm', params: { campaignId: campaign.id } }"
                                             tag="button">Añadir Anuncio
                                </router-link>
                            </div>
                            <div class="col-sm-3 ">
                                <button type="button" class="btn-sm btn-primary btn-block" @click="showBeaconForm()">Seleccionar Beacon</button>
                            </div>
                            <div class="col-sm-3 ">
                                <router-link
                                        :to="{ name: 'campaign' }"
                                        tag="button"
                                        class="btn-sm btn-danger btn-block">Volver
                                </router-link>
                            </div>
                        </div>
                    </div>
                </div>

                <app-ad-list v-if="this.campaign.ads"></app-ad-list>
                <!-- Select Beacon -->
                <div id="FormSelectBeaconModal">
                    <div id="beacon-modal" class="modal fade">
                        <div class="modal-dialog" role="document">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <h5 class="modal-title">Seleccione un beacon</h5>
                                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                        <span aria-hidden="true">&times;</span>
                                    </button>
                                </div>
                                <form>
                                    <div class="modal-body">
                                        <div class="form-group">
                                            <label class="mr-sm-2" for="inlineFormCustomSelect">Beacons</label>
                                            <select class="custom-select mb-2 mr-sm-2 mb-sm-0" id="inlineFormCustomSelect"
                                                    v-model="selected">
                                                <option selected disabled>Seleccione ...</option>
                                                <option v-for="mbeacon in beacons"
                                                        :value="mbeacon"
                                                        :key="mbeacon.id"
                                                        :disabled="!mbeacon.available">{{mbeacon.alias}}
                                                </option>
                                            </select>
                                        </div>

                                    </div>
                                    <div class="modal-footer">
                                        <button type="button" class="btn btn-primary" @click="saveBeacon()">Guardar</button>
                                        <button type="button" class="btn btn-secondary" data-dismiss="modal"
                                                @click="clearSelected()">Cancelar
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    </div>

</template>
<script>
import {required} from 'vuelidate/lib/validators'
import AppAdList from '@/components/AdList'
import AppErrorView from '@/components/ErrorView'
import {
  FETCH_CAMPAIGNS,
  AD_NEW,
  FETCH_BEACONS,
  BEACON_UPDATE
} from '@/store/actions.type'
import {PURGE_BEACON} from '@/store/mutations.type'
import {mapGetters} from 'vuex'

export default {
  name: 'AppCampaignShow',
  data () {
    return {
      title: '',
      description: '',
      image_pre: '',
      image_full: '',
      video_url: '',
      link_url: '',
      selected: {},
      showDatosCampaña: true,
      error: null
    }
  },
  validations: {
    title: {
      required
    },
    description: {
      required
    }
  },
  props: ['id'],
  components: {
    AppAdList,
    AppErrorView
  },
  computed: {
    ...mapGetters(['campaigns', 'campaign', 'beacons', 'beacon'])
  },
  created () {
    this.fetchCampaign()
  },
  methods: {
    fetchCampaign () {
      return this.$store
        .dispatch(FETCH_CAMPAIGNS, this.id)
        .then(response => {
          this.$store.commit(PURGE_BEACON)
          if (this.campaign.beacons.length > 0) {
            this.fetchBeacon()
          }
        })
        .catch(error => {
          console.log(error)
          this.error = error
        })
    },
    fetchBeacons () {
      this.$store.dispatch(FETCH_BEACONS)
    },
    fetchBeacon () {
      this.$store.dispatch(FETCH_BEACONS, this.campaign.beacons[0].id)
    },
    showBeaconForm () {
      this.fetchBeacons()
      $('#beacon-modal').modal('show')
    },
    saveBeacon () {
      this.selected.campaign_id = this.id
      this.$store.dispatch(BEACON_UPDATE, this.selected)
      $('#beacon-modal').modal('toggle')
    },
    clearSelected () {
      this.selected = {}
    },
    handleFileUpload (e) {
      console.log(this.$refs.file_image_pre.files[0])
      console.log(this.$refs.file_image_full.files[0])
      this.image_pre = this.$refs.file_image_pre.files[0]
      this.image_full = this.$refs.file_image_full.files[0]
    },
    toggleDatosCampaña () {
      this.showDatosCampaña = !this.showDatosCampaña
    }
  }
}
</script>
<style>

</style>
