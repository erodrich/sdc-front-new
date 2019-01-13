<template>
    <div class="container">
        <div class="card">
            <div class="card-header">
                <h5 class="d-flex justify-content-between align-items-center">
                    Campaña para Beacon: {{beacon.alias}}
                </h5>
            </div>
            <div class="card-body">
                <app-campaign-list>
                    <template slot="extra-th"></template>
                    <template slot="extra-td" slot-scope="beacon"></template>
                    <div slot="options" slot-scope="row">

                        <!-- Edit Button -->
                        <!-- <list-edit-button routeName="campaignForm" :entityId="row.campaign.id"></list-edit-button> -->

                        <!-- Delete Button -->
                        <!-- <list-delete-button action="CAMPAIGN_DELETE" :entityId="row.campaign.id" postAction="FETCH_CAMPAIGNS"></list-delete-button> -->

                        <!-- Assign Campaign to Beacon -->
                        <list-select-campaign-button :entityId="row.campaign.id" :isSelected="isBeaconSelected(row.campaign.beacons)"></list-select-campaign-button>

                    </div>
                </app-campaign-list>
                <div class="form-group row justify-content-center">
                    <div class="col-sm-3 ">
                        <router-link
                                :to="{ name: 'beacons' }"
                                tag="button"
                                class="btn btn-danger btn-block">Volver
                        </router-link>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import AppCampaignList from '@/components/CampaignList'
import ListEditButton from '@/components/lib/ListEditButton'
import ListDeleteButton from '@/components/lib/ListDeleteButton'
import ListSelectCampaignButton from '@/components/lib/ListSelectCampaignButton'
import {FETCH_BEACONS} from '@/store/actions.type'
import { mapGetters } from 'vuex'

export default {
  name: 'BeaconsSelectCampaign',
  components: {
    AppCampaignList,
    ListEditButton,
    ListDeleteButton,
    ListSelectCampaignButton
  },
  computed: {
    ...mapGetters([
      'beacon'
    ])
  },
  mounted(){
    this.fetchBeacon()
  },
  methods: {
    fetchBeacon () {
      if (this.$route.params.id) {
        this.$store.dispatch(FETCH_BEACONS, this.$route.params.id)

      }
    },
    isBeaconSelected (beaconsArray) {
      let flag = false
      beaconsArray.forEach( (beacon) => {
        if(beacon.id === this.beacon.id)
          flag = true
      })

      return flag
    }
  }

}
</script>
