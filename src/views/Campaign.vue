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
import {mapGetters} from 'vuex'

export default {
  name: 'Campaign',
  data () {
    return {
      id: '',
    }
  },
  components: {
    AppCampaignList,
    AppCampaignShow
  },
  computed: {
    ...mapGetters(['campaigns']),
    campaignId () {
      let answer = false
      let ids = this.campaigns.map(ob => ob.id)
      this.id = this.$route.params.id
      if (this.$route.params.id) {
        answer = this.validateId(this.$route.params.id, ids)
      }
      return answer
    }
  },
  methods: {
    validateId(id, ids){
      let isValid = false
      ids.forEach(n => {
        if(n === id){
          isValid = true
        }
      })
      return isValid
    }
  }
}
</script>
