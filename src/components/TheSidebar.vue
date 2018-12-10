<template>

    <div class="col-sm-3 col-lg-2 bg-dark">
        <div class="list-group list-group-flush m-1" >
            <router-link class="list-group-item list-group-item-action"
                         active-class="active"
                         exact
                         :to="{ name: 'home', id: '' }"
                         tag="button">
                <i class="ion-home"></i>&nbsp;Inicio
            </router-link>
            <router-link class="list-group-item list-group-item-action"
                         active-class="active"
                         exact
                         :to="{ name: 'campaign', id: '' }"
                         tag="button">
                <i class="ion-laptop"></i>&nbsp;Campañas
            </router-link>
            <router-link class="list-group-item list-group-item-action"
                         active-class="active"
                         exact
                         :to="{ name: 'beacons' }"
                         tag="button">
                <i class="ion-bluetooth"></i>&nbsp;Beacons
            </router-link>
            <router-link class="list-group-item list-group-item-action"
                         active-class="active"
                         exact
                         :to="{ name: 'settings' }"
                         tag="button">
                <i class="ion-settings"></i>&nbsp;Ajustes
            </router-link>
        </div>
    </div>

</template>
<script>
export default {
  name: 'AppSidebar'
}
</script>

