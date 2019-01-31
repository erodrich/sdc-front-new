<template>
    <div class="container">
        <div v-if="!userId">
            <div class="card">
                <div class="card-header">
                    <h5 class="d-flex justify-content-between align-items-center">
                        Usuarios
                        <router-link active-class="active"
                                     :to="{ name: 'userForm', id: '' }"
                                     tag="b-btn">
                            <i class="ion-plus"></i>
                        </router-link>
                    </h5>
                </div>
                <div class="card-body">
                    <app-user-list>
                        <div slot="options" slot-scope="row">

                            <!-- Edit Button -->
                            <list-edit-button routeName="userForm" :entityId="row.user.id"></list-edit-button>

                            <!-- Delete Button -->
                            <list-delete-button :action="deleteAction" :entityId="row.user.id" :postAction="postAction"></list-delete-button>

                        </div>
                    </app-user-list>
                </div>
            </div>
        </div>
        <app-user-show v-else :id="id"></app-user-show>
    </div>
</template>
<script>
import AppUserList from '@/components/UserList'
import AppUserShow from '@/components/UserShow'
import {
  FETCH_USERS,
  USER_DELETE
} from '@/store/actions.type'
import ListEditButton from '@/components/lib/ListEditButton'
import ListDeleteButton from '@/components/lib/ListDeleteButton'

export default {
  name: 'Clients',
  data () {
    return {
      id: '',
      deleteAction: USER_DELETE,
      postAction: FETCH_USERS
    }
  },
  components: {
    AppUserList,
    AppUserShow,
    ListEditButton,
    ListDeleteButton
  },
  computed: {
    userId () {
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
