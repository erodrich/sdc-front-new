<template>
    <div class="container">
        <div v-if="!campaignId">
            <div class="card">
                <div class="card-header">
                    <h5 class="d-flex justify-content-between align-items-center">
                        Campañas
                        <router-link active-class="active"
                                     :to="{ name: 'campaignForm', id: '' }"
                                     tag="b-btn">
                            <i class="ion-plus"></i>
                        </router-link>
                    </h5>
                </div>
                <div class="card-body">
                    <app-campaign-list :action="postAction">
                        <div slot="options" slot-scope="row">

                            <!-- Edit Button -->
                            <list-edit-button routeName="campaignForm" :entityId="row.campaign.id"></list-edit-button>

                            <!-- Delete Button -->
                            <list-delete-button :action="deleteAction" :entityId="row.campaign.id" :postAction="postAction"></list-delete-button>

                        </div>
                    </app-campaign-list>
                </div>
            </div>
        </div>
        <app-campaign-show v-else :id="id"></app-campaign-show>
    </div>
</template>
<script>
import {
  FETCH_CAMPAIGNS,
  CAMPAIGN_DELETE
} from '@/store/actions.type'
import AppCampaignList from '@/components/CampaignList'
import AppCampaignShow from '@/components/CampaignShow'
import ListEditButton from '@/components/lib/ListEditButton'
import ListDeleteButton from '@/components/lib/ListDeleteButton'

export default {
  name: 'Campaign',
  data () {
    return {
      id: '',
      deleteAction: CAMPAIGN_DELETE,
      postAction: FETCH_CAMPAIGNS
    }
  },
  components: {
    AppCampaignList,
    AppCampaignShow,
    ListEditButton,
    ListDeleteButton
  },
  computed: {
    campaignId () {
      let answer = false
      this.id = this.$route.params.id
      if (this.$route.params.id) {
        answer = true
      }
      return answer
    }
  }
}
</script>
