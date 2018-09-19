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
            </div>
        </div>

        <div class="row">
            <app-ad-list v-if="this.campaign.ads.length > 0"></app-ad-list>
        </div>
    </div>
    
</template>
<script>
import AppAdList from '@/components/AdList'
import { FETCH_CAMPAIGNS } from '@/store/actions.type'
import { mapGetters } from 'vuex'

export default {
    name: 'AppCampaignShow',
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
        this.$store.dispatch(FETCH_CAMPAIGNS, this.id)
    },
    methods: {
        test() {
            console.log(this.campaign.ads.length)
        }
    }
    
}
</script>
