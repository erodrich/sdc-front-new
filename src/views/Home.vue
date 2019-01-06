<template>
    <div>
        <app-header></app-header>
        <div class="row no-gutters" style="min-height: 720px;">
            <app-sidebar></app-sidebar>
            <div class="col-sm-9 col-lg-9 p-1 justify-content-center">
                <router-view></router-view>
            </div>
        </div>
        <app-footer></app-footer>
        <div v-if=isLoading class="lds-wrapper">
            <div class="lds-roller">
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
            </div>
        </div>

    </div>

</template>

<script>
import AppHeader from '@/components/TheHeader'
import AppFooter from '@/components/TheFooter'
import AppSidebar from '@/components/TheSidebar'
import { mapGetters } from 'vuex'

export default {
  name: 'home',
  components: {
    AppHeader,
    AppFooter,
    AppSidebar
  },
  computed: {
    ...mapGetters(['isLoading'])
  }
}
</script>
<style>
    .lds-wrapper {
        position: fixed;
        top: 0;
        width: 100%;
        height: 100%;
        background: #222222;
        opacity: 0.5;
        z-index: 1000;
    }
    .lds-roller {
        position: relative;
        margin: 40% auto;
        width: 64px;
        height: 64px;
        z-index: 1001;
    }
    .lds-roller div {
        animation: lds-roller 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
        transform-origin: 32px 32px;
    }
    .lds-roller div:after {
        content: " ";
        display: block;
        position: absolute;
        width: 6px;
        height: 6px;
        border-radius: 50%;
        background: #fff;
        margin: -3px 0 0 -3px;
    }
    .lds-roller div:nth-child(1) {
        animation-delay: -0.036s;
    }
    .lds-roller div:nth-child(1):after {
        top: 50px;
        left: 50px;
    }
    .lds-roller div:nth-child(2) {
        animation-delay: -0.072s;
    }
    .lds-roller div:nth-child(2):after {
        top: 54px;
        left: 45px;
    }
    .lds-roller div:nth-child(3) {
        animation-delay: -0.108s;
    }
    .lds-roller div:nth-child(3):after {
        top: 57px;
        left: 39px;
    }
    .lds-roller div:nth-child(4) {
        animation-delay: -0.144s;
    }
    .lds-roller div:nth-child(4):after {
        top: 58px;
        left: 32px;
    }
    .lds-roller div:nth-child(5) {
        animation-delay: -0.18s;
    }
    .lds-roller div:nth-child(5):after {
        top: 57px;
        left: 25px;
    }
    .lds-roller div:nth-child(6) {
        animation-delay: -0.216s;
    }
    .lds-roller div:nth-child(6):after {
        top: 54px;
        left: 19px;
    }
    .lds-roller div:nth-child(7) {
        animation-delay: -0.252s;
    }
    .lds-roller div:nth-child(7):after {
        top: 50px;
        left: 14px;
    }
    .lds-roller div:nth-child(8) {
        animation-delay: -0.288s;
    }
    .lds-roller div:nth-child(8):after {
        top: 45px;
        left: 10px;
    }
    @keyframes lds-roller {
        0% {
            transform: rotate(0deg);
        }
        100% {
            transform: rotate(360deg);
        }
    }

</style>
