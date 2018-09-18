<template>
<div class="adlist">
    <div class="card">
        <div class="card-header">
            <h6>Listado de anuncios</h6>
        </div>
        <div class="card-body">
            <table class="table table-striped table-hover">
                <thead>
                    <th>Titulo</th>
                    <th>Creado</th>
                    <th></th>   
                </thead>
                <tbody>
                    <tr v-for="ad in ads" :key="ad.id">
                        <router-link 
                            :to="{ name: 'ad', params: { id: ad.id } }" 
                            tag="td" 
                            ><a>{{ad.title}}</a>
                        </router-link>
                        <td>{{ad.created_at}}</td>
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
import { FETCH_ADS } from '@/store/actions.type'
import { mapGetters } from 'vuex'

export default {
    name: 'AppAdList',
    computed: {
        ...mapGetters([
            'ads',
        ])
    },
    mounted() {
        this.$store.dispatch(FETCH_ADS)
    }

    
}
</script>

