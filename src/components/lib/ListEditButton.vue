<template>
    <router-link active-class="active" class="btn-outline-secondary"
                 :to="{ name: routeName, params: {id: entityId } }"
                 tag="b-btn">
        <i class="ion-edit"></i>
    </router-link>
</template>
<script>
export default {
  props: ['routeName', 'entityId']
}
</script>
<style>
    .btn-outline-secondary {
        color: #6c757d;
        background-color: transparent;
        background-image: none;
        border-color: #6c757d;
    }
</style>
