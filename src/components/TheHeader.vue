<template>
    <div class="navbar navbar-expand-sm bg-dark fixed-top">
        <div class="container">
            <router-link class="navbar-brand"
            :to="{ name: 'home' }">
                Digicoupon
            </router-link>
            <button class="navbar-toggler" data-toggle="collapse" data-target="#navbarCollapse">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div v-if="isAuthenticated" class="collapse navbar-collapse" id="#navbarCollapse">
                <ul  class="navbar-nav">
                    <li class="nav-item">
                        <router-link class="nav-link"
                            active-class="active"
                            exact
                            :to="{ name: 'beacons' }">
                            <i class="ion-compose"></i>Beacons
                        </router-link>
                    </li>
                    <li class="nav-item">
                        <router-link class="nav-link"
                            active-class="active"
                            exact
                            :to="{ name: 'campaign' }">
                            <i class="ion-compose"></i>Campañas
                        </router-link>
                    </li>
                </ul>
                <ul class="navbar-nav ml-auto">
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
            <div  v-else class="collapse navbar-collapse" id="#navbarCollapse">
                <ul  class="nav navbar-nav ml-auto">
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
        </div>

    </div>
    
</template>
<script>
import { mapGetters } from 'vuex'

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

