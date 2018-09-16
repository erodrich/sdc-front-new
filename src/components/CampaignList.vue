<template>
<div>
    <table class="table table-striped">
        <thead>
            <th>Nombre</th>
            <th>Inicio</th>
            <th>Fin</th>
            <th>Estado</th>   
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
