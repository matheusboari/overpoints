<template>
    <div class="login-card">
        <div class="header">
            <img src="../../assets/logo-overwatch.png" alt="Logo Overwatch" class="logo">
            <h1 class="title">OverPoints</h1>
        </div>
        <div class="form">
            <el-input placeholder="Username" class="input" v-model="form.user" />
            <el-input placeholder="Senha" class="input" type="password" v-model="form.senha" />
            <el-button type="primary" class="btn" round>Login</el-button>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            form: {
                user: '',
                senha: ''
            }
        }
    }
}
</script>

<style lang="scss" scoped>
@import '~styles/default-theme';
</style>