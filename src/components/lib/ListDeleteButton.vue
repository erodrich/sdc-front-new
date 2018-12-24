<template>
    <button type="button" class="btn btn-outline-secondary" @click="deleteResource"><i class="ion-android-delete"></i></button>
</template>
<script>
export default {
  props: ['action', 'entityId', 'postAction'],
  methods: {
    deleteResource() {
      if (confirm('Seguro que desea eliminar este contenido?')) {
        this.$store.dispatch(this.action, this.entityId)
          .then(res => {
            this.$store.dispatch(this.postAction)
          })
      }
    }
  }
}
</script>
