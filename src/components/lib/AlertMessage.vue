<template>
    <div v-if="alerta" :class="alertClass" role="alert">
        <div>{{ alerta }}</div>
    </div>
</template>
<script>
import { mapGetters } from 'vuex'

export default {
  name: 'AlertMessage',
  data () {
    return {

    }
  },
  computed: {
    ...mapGetters(['alerta', 'type']),
    alertClass: function () {
      switch (this.type.toLowerCase()) {
        case 'error':
          return 'alert alert-danger'
        case 'info':
          return 'alert alert-info'
        case 'success':
          return 'alert alert-success'
      }
    }

  }
}
</script>
