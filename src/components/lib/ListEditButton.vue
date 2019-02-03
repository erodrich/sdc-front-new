<template>
    <router-link active-class="active" class="btn btn-outline-secondary"
                 :to="{ name: routeName, params: {id: entityId } }"
                 >
        <i class="ion-edit"></i>
    </router-link>
</template>
<script>
export default {
  props: ['routeName', 'entityId']
}
</script>
<style>

</style>
