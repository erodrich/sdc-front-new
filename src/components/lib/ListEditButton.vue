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
