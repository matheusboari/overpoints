<template>
    <div class="login-card">
        <div class="header">
            <h1 class="title">OverPoints</h1>
        </div>
        <div class="form">
            <el-input placeholder="Username" name="user" v-validate="'required|alpha|min:6'" class="input" v-model="form.user" />
            <el-input placeholder="E-mail" name="email" v-validate="'required|email'" class="input" v-model="form.email" />
            <el-input placeholder="Senha" name="pass" ref="pass" v-validate="'required|min:6'" class="input" type="password" v-model="form.pass" />
            <el-input placeholder="Confirmar Senha" name="confirmpass" v-validate="'required|min:6|confirmed:pass'" class="input" type="password" v-model="form.confirmPass" />

            <el-button type="primary" @click="register" class="btn" round>Registrar</el-button>

            <span class="loginbtn">ou <router-link tag="strong" :to="{ name: 'login' }">Logar</router-link></span>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            form: {
                user: '',
                email: '',
                pass: '',
                confirmPass: ''
            }
        }
    },
    methods: {
        register() {
            this.$validator.validate('user').then(result => {
                if(result) return true
                else return this.$swal('Oops...', 'O username deve ser preenchido corretamente.', 'error')
            })
            this.$validator.validate('email').then(result => {
                if(result) return true
                else return this.$swal('Oops...', 'O e-mail deve ser preenchido corretamente.', 'error')
            })
            this.$validator.validate('pass').then(result => {
                if(result) return true
                else return this.$swal('Oops...', 'A senha deve ser preenchida corretamente.', 'error')
            })
            this.$validator.validate('confirmpass').then(result => {
                if(result) return true
                else return this.$swal('Oops...', 'A confirmação da senha deve ser preenchida corretamente.', 'error')
            })

            this.$http
            .post('', form)
            .then(({ data }) => {
                if(data) this.$router.push({ name: 'login' })
                else throw err
            })
            .catch(err => {
                console.log(err)
            })
        }
    }
}
</script>

<style lang="scss" scoped>
@import '~styles/default-theme';
</style>