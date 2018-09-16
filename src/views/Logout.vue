<template>
    
</template>
<script>
import { LOGOUT } from '@/store/actions.type'
export default {
    created() {
        this.$store.dispatch(LOGOUT)
        .then(response => {
            this.$router.push({name: 'login'})
        })
    }
}
</script>
