<template>
    <div class="login-card">
        <div class="header">
            <h1 class="title">OverPoints</h1>
        </div>
        <div class="form">
            <div class="wrapinput">
                <el-input placeholder="Username" name="user" v-validate="'required|alpha|min:6'" class="input" v-model="username" />
            </div>
            <div class="wrapinput">
                <el-input placeholder="Battletag (User#1111)" name="battletag" v-validate="'required'" class="input" v-model="battletag" />
            </div>
            <div class="wrapinput">
                <el-input placeholder="E-mail" name="email" v-validate="'required|email'" class="input" v-model="email" />
            </div>
            <div class="wrapinput">
                <el-input placeholder="Senha" name="pass" ref="pass" v-validate="'required|min:6'" class="input" type="password" v-model="password" />
            </div>
            <div class="wrapinput">
                <el-input placeholder="Confirmar Senha" name="confirmpass" v-validate="'required|min:6|confirmed:pass'" class="input" type="password" v-model="confirmPass" />
            </div>

            <el-button type="primary" @click="register" class="btn" round>Registrar</el-button>

            <span class="loginbtn">ou <router-link tag="strong" :to="{ name: 'login' }">Logar</router-link></span>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            username: '',
            email: '',
            password: '',
            confirmPass: '',
            battletag: ''
        }
    },
    methods: {
        // validate() {
        //     const valid = true
        //     this.$validator.validate('user').then(result => {
        //         if(result) return true
        //         else {
        //             valid = false
        //             return this.$swal('Oops...', 'O username deve ser preenchido corretamente.', 'error')
        //         }
        //     })
        //     this.$validator.validate('email').then(result => {
        //         if(result) return true
        //         else {
        //             valid = false
        //             return this.$swal('Oops...', 'O e-mail deve ser preenchido corretamente.', 'error')
        //         }
        //     })
        //     this.$validator.validate('pass').then(result => {
        //         if(result) return true
        //         else {
        //             valid = false
        //             return this.$swal('Oops...', 'A senha deve ser preenchida corretamente.', 'error')
        //         }
        //     })
        //     this.$validator.validate('confirmpass').then(result => {
        //         if(result) return true
        //         else {
        //             valid = false
        //             return this.$swal('Oops...', 'A confirmação da senha deve ser preenchida corretamente.', 'error')
        //         }
        //     })
        //     return valid
        // },
        register() {

            this.$validator.validateAll().then((result) => {
                if(result) {
                    this.$http.post('users/register', {
                        username: this.username,
                        email: this.email,
                        password: this.password,
                        battletag: this.battletag
                    })
                    .then(({ data }) => {
                        if(data.status) {
                            this.$http.post('users/login', {
                                username: this.username,
                                password: this.password
                            })
                            .then(({ data }) => {
                                localStorage.setItem('user', JSON.stringify(data.data[0]))
                            })
                            this.$swal('Success!', 'Cadastro realizado com sucesso.', 'success')
                            .then(() => {
                                this.$router.push({ name: 'dashboard' })
                            })
                        }
                        else 
                            this.$swal('Oops...', 'Algo deu errado, tente novamente mais tarde.', 'error')
                    })
                    .catch(err => {
                        console.log(err)
                        this.$swal('Oops...', 'Algo deu errado, tente novamente mais tarde.', 'error')
                    })
                } else {
                    return this.$swal('Oops...', 'Campos inválidos', 'error')
                }
            })
        }
    }
}
</script>