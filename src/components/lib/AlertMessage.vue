<template>
    <div v-if="message" :class="[alertClass, message.dangerClass, message.successClass]">
        <div>{{ message.content }}</div>
    </div>
</template>
<script>
import { mapGetters } from 'vuex'

export default {
  name: 'AlertMessage',
  data () {
    return {
      alertClass: 'alert'
    }
  },
  computed: {
    ...mapGetters(['message'])
  }
}
</script>
