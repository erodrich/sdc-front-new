<template>
    <div class="container">
        <div v-if="!campaignId">
            <app-campaign-list></app-campaign-list>
        </div>
        <app-campaign-show v-else :id="id"></app-campaign-show>
    </div>
</template>
<script>
import AppCampaignList from '@/components/CampaignList'
import AppCampaignShow from '@/components/CampaignShow'

export default {
  name: 'Campaign',
  data () {
    return {
      id: ''
    }
  },
  components: {
    AppCampaignList,
    AppCampaignShow
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
