<template>
    <div class="container">
        <div v-if="!beaconId">
            <div class="card">
                <div class="card-header">
                    <h5 class="d-flex justify-content-between align-items-center">
                        Beacons
                        <router-link active-class="active"
                                     :to="{ name: 'beaconForm', id: '' }"
                                     tag="b-btn">
                            <i class="ion-plus"></i>
                        </router-link>
                    </h5>
                </div>
                <div class="card-body">
                    <app-beacon-admin-list>
                        <div slot="options" slot-scope="row">

                            <!-- Edit Button -->
                            <list-edit-button routeName="beaconForm" :entityId="row.beacon.id"></list-edit-button>

                            <!-- Delete Button -->
                            <list-delete-button :action="deleteAction" :entityId="row.beacon.id" :postAction="postAction"></list-delete-button>

                        </div>
                    </app-beacon-admin-list>
                </div>
            </div>
        </div>
        <app-beacon-show v-else :id="id"></app-beacon-show>
    </div>
</template>
<script>
import AppBeaconAdminList from '@/components/BeaconsAdminList'
import AppBeaconShow from '@/components/BeaconShow'
import {
  FETCH_ALL_BEACONS,
  BEACON_DELETE
} from '@/store/actions.type'
import ListEditButton from '@/components/lib/ListEditButton'
import ListDeleteButton from '@/components/lib/ListDeleteButton'

export default {
  name: 'BeaconsAdmin',
  data () {
    return {
      id: '',
      deleteAction: BEACON_DELETE,
      postAction: FETCH_ALL_BEACONS
    }
  },
  components: {
    AppBeaconAdminList,
    AppBeaconShow,
    ListEditButton,
    ListDeleteButton
  },
  computed: {
    beaconId () {
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
