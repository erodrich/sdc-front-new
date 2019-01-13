<template>

    <button type="button" class="btn btn-outline-secondary"
        @click="updateBeacon()"><i :class="[isSelected ? activeClass : 'ion-android-radio-button-off']"></i></button>
</template>
<script>
import {BEACON_UPDATE} from '@/store/actions.type'
import {mapGetters} from 'vuex'

export default {
  props: ['routeName', 'entityId', 'isSelected'],
  data () {
    return {
      newBeacon: {},
      activeClass: 'ion-android-radio-button-on'
    }
  },
  computed: {
    ...mapGetters(['beacon'])
  },
  methods: {
    updateBeacon () {
      this.beacon.campaign_id = this.entityId
      this.$store.dispatch(BEACON_UPDATE, this.beacon)
        .then(res => {
          alert('Se asignó la campaña elegida.')
          location.reload()
        })
        .catch(error => console.log(error))
    }
  }
}
</script>
