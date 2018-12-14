<template>
    <nav class="navbar navbar-expand-md navbar-dark bg-dark">

        <router-link class="navbar-brand"
                     :to="{ name: 'home' }">
            <img src="@/assets/logo.png" width="30" height="30" alt="">
            &nbsp;
            Digicupon
        </router-link>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo03"
                aria-controls="navbarTogglerDemo03" aria-expanded="true" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>

        <div v-if="isAuthenticated" class="collapse navbar-collapse justify-content-end" id="#navbarTogglerDemo03">
            <ul class="navbar-nav mr-2 mt-2 mt-lg-0 ">
                <li class="nav-item">
                    <router-link class="nav-link"
                                 active-class="active"
                                 exact
                                 :to="{ name: 'logout' }">
                        <i class="ion-gear-a"></i>&nbsp;Logout
                    </router-link>
                </li>
                <li class="nav-item" v-if="currentUser.name">
                    <router-link class="nav-link"
                                 active-class="active"
                                 exact
                                 :to="{ name: 'profile', params: { username: currentUser.name } }">
                        {{ currentUser.name }}
                    </router-link>
                </li>
            </ul>
        </div>
        <div v-else class="collapse navbar-collapse justify-content-end" id="#navbarTogglerDemo03">
            <ul class="navbar-nav mr-2 mt-2 mt-lg-0 ">
                <li class="nav-item">
                    <router-link class="nav-link"
                                 active-class="active"
                                 exact
                                 :to="{ name: 'login' }">
                        <i class="ion-compose"></i>Login
                    </router-link>
                </li>
            </ul>
        </div>
    </nav>
</template>
<script>
import {mapGetters} from 'vuex'

export default {
  name: 'AppHeader',
  computed: {
    ...mapGetters([
      'currentUser',
      'isAuthenticated'
    ])
  }
}
</script>
