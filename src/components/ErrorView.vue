<template>
    <div class="card">
        <div class="card-header">
            Error {{ error.response.data.attributes.code }}
        </div>
        <div class="card-body">
            <h5 class="card-title">{{ error.response.data.attributes.message }}</h5>
            <a href="/" class="btn btn-primary">Inicio</a>
        </div>
    </div>
</template>
<script>
export default {
  name: 'ErrorView',
  props: ['error'],
}
</script>
