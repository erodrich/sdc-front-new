<template>
    <div class="container">
        <div class="card">
            <div class="card-header">
                <h5 class="d-flex justify-content-between align-items-center">
                    Anuncio
                </h5>
            </div>
            <div class="card-body">
                <app-campaign-list-new>
                    <div slot-scope="row">

                        <!-- Edit Button -->
                        <!-- <list-edit-button routeName="campaignForm" :entityId="row.campaign.id"></list-edit-button> -->

                        <!-- Delete Button -->
                        <!-- <list-delete-button action="CAMPAIGN_DELETE" :entityId="row.campaign.id" postAction="FETCH_CAMPAIGNS"></list-delete-button> -->

                        <!-- Assign Campaign to Beacon -->
                        <list-select-campaign-button :entityId="row.campaign.id" :isSelected="row.campaign.beacons.length > 0 ? true : false"></list-select-campaign-button>
                    </div>
                </app-campaign-list-new>
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
import AppCampaignListNew from '@/components/CampaignListNew'
import ListEditButton from '@/components/lib/ListEditButton'
import ListDeleteButton from '@/components/lib/ListDeleteButton'
import ListSelectCampaignButton from '@/components/lib/ListSelectCampaignButton'

export default {
  name: 'BeaconsSelectCampaign',
  components: {
    AppCampaignListNew,
    ListEditButton,
    ListDeleteButton,
    ListSelectCampaignButton
  },

}
</script>
