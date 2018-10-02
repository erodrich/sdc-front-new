<template>
<div class="campaignlist">
    <div class="card">
        <div class="card-header">
            <h5 class="float-left">Campañas&nbsp;&nbsp;</h5>
            <span class="float-left"><a href="#" @click="showFormModal()"><i class="ion-plus" ></i></a></span>
        </div>
        <div class="card-body">
            <table class="table table-striped table-hover">
                <thead>
                    <th>Nombre</th>
                    <th>Inicio</th>
                    <th>Fin</th>
                    <th>Activa</th>
                    <th></th>   
                </thead>
                <tbody>
                    <tr v-for="(campaign, index) in campaigns" :key="index">
                        <router-link 
                            :to="{ name: 'campaign', params: { id: campaign.id } }" 
                            tag="td" 
                            ><a>{{campaign.name}}</a>
                        </router-link>
                        <td>{{campaign.start_date}}</td>
                        <td>{{campaign.end_date}}</td>
                        <td class="text-center">
                            <i v-if="campaign.active" class="ion-checkmark"></i>
                            <i v-else class="ion-close"></i>
                        </td>
                        <td>
                            <a href="#" class="btn btn-primary">
                                Edit       
                            </a>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
    <!-- Nuevo Campaña -->
    <div id="FormModal">
        <div id="my-modal" class="modal fade">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">Nueva campaña</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <form>
                    <div class="modal-body">
                        
                            <div class="form-group">
                                <label>Nombre de Campaña</label>
                                <input type="text" class="form-control" placeholder="Page Title" value="About" v-model="newCampaign.name">
                            </div>
                            <div class="form-group">
                                <label>Vigente desde:</label>
                                <input type="text" class="form-control" name="start_date" placeholder="YYYY-MM-DD" v-model="newCampaign.start_date">
                            </div>
                            <div class="form-group">
                                <label>Vigente hasta:</label>
                                <input type="text" class="form-control" name="endt_date" placeholder="YYYY-MM-DD" v-model="newCampaign.end_date">
                            </div>
                            <div class="form-check">
                                <input class="form-check-input" type="radio" name="exampleRadios1" v-model="newCampaign.active" v-bind:value="1" checked>
                                <label class="form-check-label" for="exampleRadios1">
                                    Activar
                                </label>
                            </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-primary" @click="saveCampaign()">Guardar</button>
                        <button type="button" class="btn btn-secondary" data-dismiss="modal" @click="clearNewCampaign()">Cancelar</button>
                    </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</div>
    
</template>
<script>
import { FETCH_CAMPAIGNS, CAMPAIGN_NEW } from '@/store/actions.type'
import { mapGetters } from 'vuex'

export default {
    name: 'CampaignList',
    data() {
        return {
            newCampaign: {
                name: '',
                start_date: '',
                end_date: '',
                active: '',
                client_id: '',
            }
        }
    },    
    computed: {
      ...mapGetters([
        'campaigns',
        'getClientId'
      ])
    },
    mounted() {
        this.fetchCampaigns()
    },
    methods: {
        fetchCampaigns(){
            this.$store.dispatch(FETCH_CAMPAIGNS)
        },
        showFormModal() {
            console.log("Mostrar")
            this.clearNewCampaign()
            $("#my-modal").modal('show');
        },
        clearNewCampaign() {
            this.newCampaign.name = ''
            this.newCampaign.start_date = ''
            this.newCampaign.end_date = ''
            this.newCampaign.active = ''
        },
        saveCampaign() {
            this.newCampaign.client_id = this.getClientId;
            this.$store.dispatch(CAMPAIGN_NEW, this.newCampaign)
            $('#my-modal').modal('toggle');
            this.fetchCampaigns()
        }
    }

    
}
</script>
