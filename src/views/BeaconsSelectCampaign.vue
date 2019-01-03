<template>
    <div class="container">
        <app-campaign-list-new>
            <div slot-scope="row">

                <!-- Edit Button -->
                <list-edit-button routeName="campaignForm" :entityId="row.campaign.id"></list-edit-button>

                <!-- Delete Button -->
                <list-delete-button action="CAMPAIGN_DELETE" :entityId="row.campaign.id" postAction="FETCH_CAMPAIGNS"></list-delete-button>

                <!-- Assign Campaign to Beacon -->
                <list-select-campaign-button :entityId="row.campaign.id" ></list-select-campaign-button>
            </div>
        </app-campaign-list-new>
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
