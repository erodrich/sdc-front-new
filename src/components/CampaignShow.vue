<template>
    <div class="campaignshow">
        <div class="row">
            <div class="card">
                <div class="card-header">
                    <h5>Detalle de Campaña</h5>
                </div>
                <div class="card-body">
                    <dl class="row">
                        <dt class="col-sm-3">Campaña: </dt>
                        <dd class="col-sm-9">{{ campaign.name }}</dd>
                        <dt class="col-sm-3">Fecha Inicio: </dt>
                        <dd class="col-sm-9">{{ campaign.start_date }}</dd>
                        <dt class="col-sm-3">Fecha Fin:</dt>
                        <dd class="col-sm-9">{{ campaign.end_date }}</dd>
                        <dt class="col-sm-3">Estado:</dt>
                        <dd class="col-sm-9">
                            {{campaign.active == 1 ? "Activo" : "Inactivo"}}
                        </dd>
                        <template v-if="beacon.id">
                            <dt class="col-sm-3">Beacon:</dt>
                            <dd class="col-sm-9">{{ beacon.alias }}</dd>
                        </template>
                    </dl>
                </div>
                <div class="card-footer">
                    <button type="button" class="btn btn-primary" @click="showAdForm()">Añadir Anuncio</button>
                    <button type="button" class="btn btn-primary" @click="showBeaconForm()">Seleccionar Beacon</button>
                </div>
            </div>
        </div>

        <div class="row">
            <app-ad-list v-if="this.campaign.ads"></app-ad-list>
        </div>
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
                        <label class="mr-sm-2" for="inlineFormCustomSelect">Beacons</label>
                        <select class="custom-select mb-2 mr-sm-2 mb-sm-0" id="inlineFormCustomSelect" v-model="selected">
                            <option selected disabled>Seleccione ...</option>
                            <option v-for="mbeacon in beacons" 
                                :value="mbeacon"
                                :key="mbeacon.id"
                                :disabled="!mbeacon.available">{{mbeacon.alias}}</option>
                        </select>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-primary" @click="saveBeacon()">Guardar</button>
                        <button type="button" class="btn btn-secondary" data-dismiss="modal" @click="clearSelected()">Cancelar</button>
                    </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
    <!-- Nuevo Anuncio -->
    <div id="FormAdModal">
        <div id="ad-modal" class="modal fade">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">Nuevo Anuncio</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <form>
                    <div class="modal-body">
                            <div class="form-group">
                                <label>Título</label>
                                <input type="text" 
                                    class="form-control" 
                                    name="start_date" 
                                    v-model="newAd.title">
                            </div>
                            <div class="form-group">
                                <label>Descripción</label>
                                <input type="text" 
                                    class="form-control" 
                                    name="start_date" 
                                    v-model="newAd.description">
                            </div>
                            <div class="form-group">
                                <label>Imagen de Previsualización</label>
                                <input type="file"
                                    id="file_image_pre"
                                    ref="file_image_pre" 
                                    class="form-control"
                                    @change="handleFileUpload()">
                            </div>
                            <div class="form-group">
                                <label>Imagen principal</label>
                                <input type="file"
                                    id="file_image_full"
                                    ref="file_image_full"
                                    class="form-control"
                                    @change="handleFileUpload()">
                            </div>
                            <div class="form-group">
                                <label>Video link:</label>
                                <input type="text" 
                                    class="form-control" 
                                    name="endt_date" 
                                    v-model="newAd.video_url">
                            </div>
                            <div class="form-group">
                                <label>Url link:</label>
                                <input type="text" 
                                    class="form-control" 
                                    name="endt_date" 
                                    v-model="newAd.link_url">
                            </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-primary" @click="saveAd()">Guardar</button>
                        <button type="button" class="btn btn-secondary" data-dismiss="modal" @click="clearNewAd()">Cancelar</button>
                    </div>
                    </form>
                </div>
            </div>
        </div>
    </div>

    </div>
    
</template>
<script>
import AppAdList from '@/components/AdList'
import { FETCH_CAMPAIGNS, AD_NEW, FETCH_BEACONS, BEACON_UPDATE } from '@/store/actions.type'
import { PURGE_BEACON } from '@/store/mutations.type'
import { mapGetters } from 'vuex'

export default {
    name: 'AppCampaignShow',
    data() {
        return {
            newAd: {
                title: '',
                description: '',
                image_pre: '',
                image_full: '',
                video_url: '',
                link_url: '',
            },
            selected: {},
        }
    },
    props: [
        'id'
    ],
    components: {
        AppAdList
    },
    computed: {
      ...mapGetters([
        'campaign',
        'beacons',
        'beacon'
      ])
    },
    mounted() {
        this.fetchCampaign()
    },
    methods: {
        fetchCampaign() {
           return this.$store.dispatch(FETCH_CAMPAIGNS, this.id)
            .then((response) => {
                //
                console.log(this.campaign.beacons)
                this.$store.commit(PURGE_BEACON);
                if(this.campaign.beacons.length > 0) {
                    console.log(this.campaign.beacons.length)
                    this.fetchBeacon();
                }
            })
            .catch((error) => {
                console.log(error)
            })
        },
        fetchBeacons() {
            this.$store.dispatch(FETCH_BEACONS)
        },
        fetchBeacon() {
            this.$store.dispatch(FETCH_BEACONS, this.campaign.beacons[0].id)                     
        },
        showAdForm() {
            console.log("Muestro Formulario")
            $("#ad-modal").modal('show');
        },
        showBeaconForm() {
            this.fetchBeacons();
            $("#beacon-modal").modal('show'); 
        },
        saveBeacon() {
            this.selected.campaign_id = this.id 
            this.$store.dispatch(BEACON_UPDATE, this.selected)
            this.fetchCampaign()
            $('#beacon-modal').modal('toggle');
        },
        saveAd(){
            let formData = new FormData();
            formData.append('title', this.newAd.title)
            formData.append('description', this.newAd.description)
            formData.append('image_pre', this.newAd.image_pre)
            formData.append('image_full', this.newAd.image_full)
            formData.append('video_url', this.newAd.video_url)
            formData.append('link_url', this.newAd.link_url)
            formData.append('campaign_id', this.campaign.id)
            console.log(formData)
            this.$store.dispatch(AD_NEW, formData)
            $('#ad-modal').modal('toggle');
            this.fetchBeacons();
        },
        clearNewAd() {
            this.newAd = {}
        },
        clearSelected() {
            this.selected = {}
        },
        handleFileUpload(e) {
            console.log(this.$refs.file_image_pre.files[0])
            this.newAd.image_pre = this.$refs.file_image_pre.files[0];
            this.newAd.image_full = this.$refs.file_image_full.files[0];
        }
    }
    
}
</script>
