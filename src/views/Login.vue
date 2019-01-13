<template>
    <div id="login-form">
        <div class="dark-overlay">
            <div class="container">
                <div class="row justify-content-center">
                    <div class="col-md-6">
                        <div class="card text-center card-form">
                            <div class="card-body">
                                <h3>Digicupon</h3>
                                <hr>
                                <ul v-if="getErrorMsg(errors)" class="alert alert-danger">
                                    <div>{{getErrorMsg(errors)}}</div>
                                </ul>
                                <form action="#" @submit.prevent="login(username, password)">
                                    <div class="form-group" :class="{invalid: $v.username.$error}">
                                        <input type="email"
                                                name="username"
                                                id="username"
                                                class="form-control form-control-lg"
                                                placeholder="email"
                                                @blur="$v.username.$touch()"
                                                v-model="username">
                                        <p v-if="$v.username.$error">Por favor introduzca su correo</p>
                                    </div>
                                    <div class="form-group" :class="{invalid: $v.password.$error}">
                                        <input type="password"
                                                name="password"
                                                id="password"
                                                class="form-control form-control-lg"
                                                placeholder="password"
                                                @blur="$v.password.$touch()"
                                                v-model="password">
                                        <p v-if="$v.password.$error">Por favor introduzca su contraseña</p>

                                    </div>
                                    <input  type="submit"
                                            class="btn btn-info btn-block"
                                            :disabled="$v.username.$error || $v.password.$error"
                                            value="Entrar">
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

</template>
<script>
import { required, email } from 'vuelidate/lib/validators'
import { mapState } from 'vuex'
import { LOGIN, CHECK_AUTH } from '@/store/actions.type'

export default {
  name: 'AppLogin',
  data () {
    return {
      username: null,
      password: null
    }
  },
  validations: {
    username: {
      required,
      email
    },
    password: {
      required
    }
  },
  methods: {
    login () {
      this.$store.dispatch(LOGIN, { username: this.username, password: this.password })
        .then(() => {
          this.$router.push({ name: 'home' })
        })

    },
    getErrorMsg (errors) {
      for (var k in errors) {
        if (k === 'response') {
          // console.log(errors)
          return errors[k].data
        }
      }
    }
  },
  computed: {
    ...mapState({
      errors: state => state.auth.errors
    })
  }
}
</script>
<style scoped>
#login-form {
  background: url("../img/bg-img.jpg") no-repeat;
  min-height: 900px;
  background-size: cover;
  background-attachment: fixed;
}
.dark-overlay {
  background-color: rgba(0, 0, 0, 0.7);
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
.container {
  padding-top: 150px;

}
.card-body {
  background-color: rgba(133, 186, 220, 1);
  border-radius: 15px;
}
.card {
  background-color: rgba(133, 186, 220, 1);
  border-radius: 15px;

}
.invalid input {
  border: 1px solid red;
  background-color:#ffd7c7;
}
</style>
