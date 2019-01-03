<template>

    <button type="button" class="btn btn-outline-secondary"
        @click="updateBeacon()"><i class="ion-android-delete"></i></button>
</template>
<script>
import {FETCH_BEACONS, BEACON_UPDATE} from '@/store/actions.type'
import {mapGetters} from 'vuex'

export default {
  props: ['routeName', 'entityId'],
  data () {
    return {
      newBeacon: {}
    }
  },
  computed: {
    ...mapGetters(['beacon'])
  },
  mounted () {
    this.fetchBeacon()
  },
  methods: {
    fetchBeacon () {
      if (this.$route.params.id) {
        this.$store.dispatch(FETCH_BEACONS, this.$route.params.id)
          .then(res => {
            this.newBeacon = this.beacon
          })
      }
    },
    updateBeacon () {
      console.log(this.entityId)
      this.newBeacon.campaign_id = this.entityId
      this.$store.dispatch(BEACON_UPDATE, this.newBeacon)
        .then(res => console.log(res.data))
        .catch(error => console.log(error))
    }
  }
}
</script>
