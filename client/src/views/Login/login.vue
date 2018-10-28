<template>
    <div class="login-card">
        <div class="header">
            <h1 class="title">OverPoints</h1>
        </div>
        <div class="form">
            <el-input placeholder="Username" v-validate="'required'" class="input" v-model="form.user" />
            <el-input placeholder="Senha" v-validate="'required'" class="input" type="password" v-model="form.pass" />

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
            form: {
                user: '',
                pass: ''
            }
        }
    },
    methods: {
        login() {
            this.$validator.validateAll().then(result => {
                if(result) {
                    this.$swal('Success!', 'Você está logado!', 'success')
                    console.log('submit')
                } else this.$swal('Oops...', 'Todos campos devem ser preenchidos corretamente.', 'error')
            })
        }
    }
}
</script>

<style lang="scss" scoped>
@import '~styles/default-theme';
</style>