<template>
    <div>
        <app-header></app-header>
        <div class="row no-gutters" style="min-height: 720px;">
            <app-sidebar></app-sidebar>
            <div class="col-sm-9 col-lg-8 p-1 justify-content-center">
                <router-view></router-view>
            </div>
        </div>
        <app-footer></app-footer>
    </div>
</template>

<script>
import AppHeader from '@/components/TheHeader'
import AppFooter from '@/components/TheFooter'
import AppSidebar from '@/components/TheSidebar'

export default {
  name: 'home',
  components: {
    AppHeader,
    AppFooter,
    AppSidebar
  }
}
</script>
