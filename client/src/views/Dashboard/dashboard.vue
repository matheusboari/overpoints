<template>
    <div class="body">
        <header class="header">
            <img src="../../assets/logo-overwatch.png" class="logo" alt="Logo Overwatch">
            <h4 class="title">Overpoints</h4>
        </header>
        <main class="main-info" v-if="!apiRes.private">
            <img class="icon" :src="apiRes.icon" alt="Profile Icon">
            <div class="ratinglevel">
                <div class="info">
                    <em class="title">Rating - </em><strong class="value">{{apiRes.rating}}</strong>
                </div>
                <hr class="divisor" />
                <div class="info">
                    <em class="title">Level - </em><strong class="value"><span v-if="apiRes.prestige > 0">{{apiRes.prestige}}</span>{{apiRes.level}}</strong>
                </div>
            </div>
            <span class="nick">{{apiRes.name}}</span>
        </main>
        <div class="block" v-else>
            Perfil privado, para acessar dados gerais basta desabilitar dentro do jogo.
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            user: localStorage.getItem('user'),
            apiRes: {}
        }
    },
    created() {
        this.$http.get('https://ow-api.com/v1/stats/pc/us/Snoopy-1691/profile')
        .then((data) => {
            console.log(data.data)
            this.apiRes = data.data
        })
    }
    // beforeRouteEnter(to, from, next) {
    //     const user = JSON.parse(localStorage.getItem('user'))
    //     if(!user) {
    //         next({ name: 'login' })
    //     } else next()
    // }
}
</script>