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
                    </dl>
                </div>
                <div class="card-footer">
                    <button type="button" class="btn btn-primary" @click="showAdForm()">Añadir Anuncio</button>
                </div>
            </div>
        </div>

        <div class="row">
            <app-ad-list v-if="this.campaign.ads"></app-ad-list>
        </div>
    <div id="FormModal">
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
                                <input type="text" class="form-control" name="start_date" v-model="newAd.title">
                            </div>
                            <div class="form-group">
                                <label>Subtítulo</label>
                                <input type="text" class="form-control" name="start_date" v-model="newAd.subtitle">
                            </div>
                            <div class="form-group">
                                <label>Imagen de Previsualización</label>
                                <input type="text" class="form-control" name="endt_date" v-model="newAd.image_pre_name">
                            </div>
                            <div class="form-group">
                                <label>Imagen principal</label>
                                <input type="text" class="form-control" name="endt_date" v-model="newAd.image_full_name">
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
import { FETCH_CAMPAIGNS, AD_NEW } from '@/store/actions.type'
import { mapGetters } from 'vuex'

export default {
    name: 'AppCampaignShow',
    data() {
        return {
            newAd: {}
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
      ])
    },
    mounted() {
        this.fetchCampaign()
    },
    methods: {
        fetchCampaign() {
            this.$store.dispatch(FETCH_CAMPAIGNS, this.id)
        },
        showAdForm() {
            console.log("Muestro Formulario")
            $("#ad-modal").modal('show');
        },
        saveAd(){
            console.log(this.newAd)
            this.newAd.campaign_id = this.campaign.id
            this.$store.dispatch(AD_NEW, this.newAd)
            this.fetchCampaign()
            $('#ad-modal').modal('toggle');
        },
        clearNewAd() {
            this.newAd = {}
        }
    }
    
}
</script>
