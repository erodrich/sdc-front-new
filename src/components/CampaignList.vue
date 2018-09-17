<template>
<div class="campaignlist">
    <div class="card">
        <div class="card-header">
            <h5>Campañas</h5>
        </div>
        <div class="card-body">
            <table class="table table-striped">
                <thead>
                    <th>Campaña</th>
                    <th>Inicio</th>
                    <th>Fin</th>
                    <th>Activa</th>   
                </thead>
                <tbody>
                    <tr v-for="campaign in campaigns" :key="campaign.id">
                        <router-link 
                            :to="{ name: 'campaign', params: { id: campaign.id } }" 
                            tag="td" 
                            ><a>{{campaign.name}}</a>
                        </router-link>
                        <td>{{campaign.startDate}}</td>
                        <td>{{campaign.endDate}}</td>
                        <td>{{campaign.active}}</td>
                        <td>
                            <a href="#" class="btn btn-primary">
                                <span data-feather="edit">Edit</span>        
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
            campaigns: []
        }
    },    
    computed: {
      ...mapGetters([
        'currentUser'
      ])
    },
    watch: {
        currentUser() {
            this.$store.dispatch(FETCH_CAMPAIGNS)
        }
    },

    
}
</script>
