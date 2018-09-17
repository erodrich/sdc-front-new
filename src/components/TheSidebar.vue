<template>
<section class="sidebar">
    <div class="card">
        <div class="card-header">
            <h5 class="card-title">Dashboard</h5>
        </div>
        <div class="list-group">
            <router-link class="list-group-item list-group-item-action"
                active-class="active"
                exact
                :to="{ name: 'campaign', id: '' }">
                <i class="ion-laptop"></i>&nbsp;Campañas
            </router-link>
            <router-link class="list-group-item list-group-item-action"
                active-class="active"
                exact
                :to="{ name: 'beacons' }">
                <i class="ion-bluetooth"></i>&nbsp;Beacons
            </router-link>
            <router-link class="list-group-item list-group-item-action"
                active-class="active"
                exact
                :to="{ name: 'settings' }">
                <i class="ion-settings"></i>&nbsp;Ajustes
            </router-link>
        </div>
    </div>
</section>
    
</template>
<script>
export default {
    name: 'AppSidebar'
}
</script>

