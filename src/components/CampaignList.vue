<template>
<div class="campaignlist">
    <div class="card">
        <div class="card-header">
            <h5>Campañas</h5>
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
                    <tr v-for="campaign in campaigns" :key="campaign.id">
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

</div>
    
</template>
<script>
import { FETCH_CAMPAIGNS } from '@/store/actions.type'
import { mapGetters } from 'vuex'

export default {
    name: 'CampaignList',
    data() {
        return {
            
        }
    },    
    computed: {
      ...mapGetters([
        'campaigns',
      ])
    },
    mounted() {
        this.$store.dispatch(FETCH_CAMPAIGNS)
    }

    
}
</script>
