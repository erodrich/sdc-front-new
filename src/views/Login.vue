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
                                <form action="#" @submit.prevent="login(username, password)">
                                    <div class="form-group">
                                        <input type="email" 
                                                name="username" 
                                                id="username" 
                                                class="form-control form-control-lg"
                                                placeholder="email"
                                                v-model="username">
                                    </div>
                                    <div class="form-group">
                                        <input type="password" 
                                                name="password" 
                                                id="password" 
                                                class="form-control form-control-lg"
                                                placeholder="password" 
                                                v-model="password">
                                    </div>
                                    <input type="submit" class="btn btn-outline-light btn-block" value="Entrar">
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
import { mapState } from 'vuex'
import { LOGIN } from '@/store/actions.type'

export default {
    name: 'AppLogin',
    data() {
        return {
            username: null,
            password: null,
        }
    },
    methods: {
        login() {
            this.$store.dispatch(LOGIN, {
                username: this.username,
                password: this.password
            })
            .then(() => this.$router.push({name: 'home'}))
        }
    },
    ...mapState({
        errors: state => state.auth.errors
    })
}
</script>
<style scoped>
#login-form {
    background: url('../img/bg-img.jpg') no-repeat;
    min-height: 800px;
    background-size: cover;
    background-attachment: fixed;
}
.dark-overlay {
    background-color: rgba(0,0,0,0.7);
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    min-height: 800px;
}
.container{
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
</style>

