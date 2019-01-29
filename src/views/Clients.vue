<template>
    <div class="container">
        <div v-if="!clientId">
            <div class="card">
                <div class="card-header">
                    <h5 class="d-flex justify-content-between align-items-center">
                        Clientes
                        <router-link active-class="active"
                                     :to="{ name: 'clientForm', id: '' }"
                                     tag="b-btn">
                            <i class="ion-plus"></i>
                        </router-link>
                    </h5>
                </div>
                <div class="card-body">
                    <app-client-list>
                        <div slot="options" slot-scope="row">

                            <!-- Edit Button -->
                            <list-edit-button routeName="clientForm" :entityId="row.client.id"></list-edit-button>

                            <!-- Delete Button -->
                            <list-delete-button :action="deleteAction" :entityId="row.client.id" :postAction="postAction"></list-delete-button>

                        </div>
                    </app-client-list>
                </div>
            </div>
        </div>
        <app-client-show v-else :id="id"></app-client-show>
    </div>
</template>
<script>
import AppClientList from '@/components/ClientList'
import AppClientShow from '@/components/ClientShow'
import {
  FETCH_CLIENTS,
  CLIENT_DELETE
} from '@/store/actions.type'
import ListEditButton from '@/components/lib/ListEditButton'
import ListDeleteButton from '@/components/lib/ListDeleteButton'

export default {
  name: 'Clients',
  data () {
    return {
      id: '',
      deleteAction: CLIENT_DELETE,
      postAction: FETCH_CLIENTS
    }
  },
  components: {
    AppClientList,
    AppClientShow,
    ListEditButton,
    ListDeleteButton
  },
  computed: {
    clientId () {
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
