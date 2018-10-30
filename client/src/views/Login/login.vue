<template>
    <div class="login-card">
        <div class="header">
            <h1 class="title">OverPoints</h1>
        </div>
        <div class="form">
            <el-input placeholder="Username" v-validate="'required'" class="input" v-model="username" />
            <el-input placeholder="Senha" v-validate="'required'" class="input" type="password" v-model="password" />

            <el-button type="primary" @click="login" class="btn" round>Login</el-button>

            <span class="registerbtn">ou <router-link tag="strong" :to="{ name: 'register' }">Cadastre-se</router-link></span>
            <span class="recoverbtn">Esqueceu a senha? <strong>Recuperar</strong></span>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            username: '',
            password: ''
        }
    },
    methods: {
        login() {
            this.$validator.validateAll().then(result => {
                if(result) {
                    this.$http.post('users/login', {
                        username: this.username,
                        password: this.password
                    })
                    .then(({ data }) => {
                        if(data.status) {
                            localStorage.setItem('user', data.data)
                            this.$router.push({ name: 'dashboard' })
                        } else {
                            this.$swal('Oops...', 'Você não está cadastrado. Cadastre-se, é de graça :D.', 'error')
                        }
                    })
                } else this.$swal('Oops...', 'Todos campos devem ser preenchidos corretamente.', 'error')
            })
        }
    }
}
</script>

<style lang="scss" scoped>
@import '~styles/default-theme';
</style>