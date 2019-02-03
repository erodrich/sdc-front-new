<template>
    <div class="container">
        <div class="card">
            <div class="card-header">
                <h5 class="d-flex justify-content-between align-items-center">
                    Nuevo Usuario
                </h5>
            </div>
            <div class="card-body">
                <form @submit.stop.prevent="handleSubmit">
                    <div class="form-group row" :class="{invalid: $v.newUser.name.$error}">
                        <label class="col-sm-2 col-form-label">Nombre:</label>
                        <div class="col-sm-10">
                            <input type="text"
                                   class="form-control"
                                   placeholder="nombre"
                                   @blur="$v.newUser.name.$touch()"
                                   v-model="newUser.name">
                        </div>
                    </div>
                    <div class="form-group row" :class="{invalid: $v.newUser.email.$error}">
                        <label class="col-sm-2 col-form-label">Email: </label>
                        <div class="col-sm-10">
                            <input type="text"
                                   class="form-control"
                                   placeholder="email"
                                   @blur="$v.newUser.email.$touch()"
                                   v-model="newUser.email">
                        </div>
                    </div>
                    <div class="form-group row">
                        <label class="col-sm-2 col-form-label">Password: </label>
                        <div class="col-sm-10">
                            <input type="password"
                                   class="form-control"
                                   placeholder=""
                                   v-model="newUser.password">
                        </div>
                    </div>
                    <div class="form-group row justify-content-center">
                        <div class="col-sm-3 ">
                            <button type="submit" class="btn btn-info w-100">Guardar</button>
                        </div>
                        <div class="col-sm-3 ">
                            <router-link
                                    :to="{ name: 'users' }"
                                    tag="button"
                                    class="btn btn-danger btn-block">Cancelar
                            </router-link>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>
<script>
import {
  FETCH_USERS,
  USER_NEW,
  USER_EDIT,
  MARK_AS_LOADING,
  MARK_AS_NOT_LOADING
} from '@/store/actions.type'
import {required} from 'vuelidate/lib/validators'
import {mapGetters} from 'vuex'
import Datepicker from 'vuejs-datepicker'
import {es} from 'vuejs-datepicker/dist/locale'

export default {
  name: 'UserEdit',
  data () {
    return {
      newUser: {
        name: '',
        email: '',
        password: ''
      },
      editFlag: false,
      es: es,
      bootstrapStyling: true
    }
  },
  props: ['id'],
  components: {
    Datepicker
  },
  validations: {
    newUser: {
      name: {
        required
      },
      email: {
        required
      }
    }
  },
  computed: {
    ...mapGetters(['user', 'users'])
  },
  created () {
    if (this.id) {
      this.editFlag = true
      this.fetchUser()
    }
  },
  methods: {
    handleSubmit () {
      this.$store.dispatch(MARK_AS_LOADING)
      if (this.editFlag) {
        this.$store.dispatch(CLIENT_EDIT, this.newUser)
          .then(res => {
            this.$store.dispatch(MARK_AS_NOT_LOADING)
            console.log(res)
            this.$router.push({name: 'users', params: {id: res.data.id}})
          })
          .catch(error => {
            console.log(error)
            this.$store.dispatch(MARK_AS_NOT_LOADING)
          })
      } else {
        this.$store.dispatch(CLIENT_NEW, this.newUser)
          .then(res => {
            this.$store.dispatch(MARK_AS_NOT_LOADING)
            console.log(res)
            this.$router.push({name: 'users', params: {id: res.data.id}})
          })
          .catch(error => {
            console.log(error)
            this.$store.dispatch(MARK_AS_NOT_LOADING)
          })
      }
    },
    fetchUser () {
      this.$store.dispatch(FETCH_USERS, this.id)
        .then(res => {
          console.log(this.user)
          this.newUser = this.user
        })
    }
  }
}

</script>
<style>
    .invalid input {
        border: 1px solid red;
        background-color: #ffd7c7;
    }
</style>
