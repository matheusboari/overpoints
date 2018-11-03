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

        <div class="container">
            <div class="points">
                <el-input placeholder="Pontos (SR)" v-validate="'required'" v-mask="'##'" class="input" v-model="point" />
                <div class="buttons">
                    <el-button type="success" @click="win(point)" round>Vitória</el-button>
                    <el-button type="danger" @click="lose(point)" round>Derrota</el-button>
                </div>
            </div>
            
            <div class="graph" v-loading="loading">
                <line-chart
                    v-if="!loading"
                    :data="dataChart"
                    :options="options"
                    :width="350"
                    :height="200"
                ></line-chart>
            </div>
            
            <el-button type="danger" class="logout" @click="logout" plain>Logout</el-button>
        </div>
        
    </div>
</template>

<script>
import LineChart from '../../components/chartPoints.js'

export default {
    components: {
        LineChart
    },
    data() {
        return {
            user: localStorage.getItem('user'),
            apiRes: {},
            point: '',
            update: false,
            loading: false,
            dataChart: {},
            options: {
                responsive: true, 
                maintainAspectRatio: false
            }
        }
    },
    methods: {
        logout() {
            localStorage.removeItem('user')
            this.$router.push({ name: 'login' })
        },
        win(point) {
            this.$validator.validateAll().then(result => {
                if(result) {
                    this.loading = true
                    this.user.points.history.push(Number(point))
                    this.user.points.ratings.push(Number(this.user.points.rating) + Number(point))

                    this.$http.put('users/' + this.user._id, {
                        points: {
                            history: this.user.points.history,
                            ratings: this.user.points.ratings,
                            rating: Number(this.user.points.rating) + Number(point)
                        }
                    }).then(({ data }) => {
                        this.user.points.rating = Number(this.user.points.rating) + Number(point)
                        localStorage.setItem('user', JSON.stringify(this.user))
                        this.loading = false
                        this.update = !this.update
                    })
                    .catch(err => console.log(err))
                } else this.$swal('Oops...', 'Você deve preencher o campo de pontuação', 'error')
            })
        },
        lose(point) {
            this.$validator.validateAll().then(result => {
                if(result) {
                    this.loading = true
                    this.user.points.history.push(Number(-point))
                    this.user.points.ratings.push(Number(this.user.points.rating) - Number(point))

                    this.$http.put('users/' + this.user._id, {
                        points: {
                            history: this.user.points.history,
                            ratings: this.user.points.ratings,
                            rating: Number(this.user.points.rating) - Number(point)
                        }
                    }).then(({ data }) => {
                        this.user.points.rating = Number(this.user.points.rating) - Number(point)
                        localStorage.setItem('user', JSON.stringify(this.user))
                        this.loading = false
                        this.update = !this.update
                    })
                    .catch(err => console.log(err))
                } else this.$swal('Oops...', 'Você deve preencher o campo de pontuação', 'error')
            })
        },
        getApi() {
            this.$http.get('https://ow-api.com/v1/stats/pc/us/' + this.user.battletag + '/profile')
            .then((data) => {
                if(!data.data.error) {
                    this.apiRes = data.data
                    this.$http.put('users/' + this.user._id, {
                        points: {
                            history: this.user.points.history,
                            ratings: this.user.points.ratings,
                            rating: Number(this.apiRes.rating)
                        }
                    })
                    .then(({ data }) => {
                        this.user.points.rating = this.apiRes.rating
                        
                        // if(this.user.points.ratings.length == 0) {
                        //     this.user.points.ratings.push(this.user.points.rating)
                        // }

                        localStorage.setItem('user', JSON.stringify(this.user))
                        this.update = !this.update
                        return true
                    })
                    .catch(err => console.log(err))
                } else {
                    this.$swal('Oops...', 'Sua battletag está incorreta, contate um adm', 'error').then(() => {
                        localStorage.removeItem('user')
                        this.$router.push({ name: 'login' })
                    })
                }
            })
        }
    },
    created() {
        this.user = JSON.parse(this.user)
        this.user.battletag = this.user.battletag.replace('#', '-')
        this.getApi()

        this.dataChart = {
            labels: this.user.points.history,
            datasets: [
                {
                    label: 'Points',
                    backgroundColor: 'rgb(32,194,255, .5)',
                    data: this.user.points.ratings
                }
            ]
        }
    },
    beforeRouteEnter(to, from, next) {
        const user = JSON.parse(localStorage.getItem('user'))
        if(!user) {
            next({ name: 'login' })
        } else next()
    },
    watch: {
        update() {
            this.user = JSON.parse(localStorage.getItem('user'))
            this.dataChart.labels = this.user.points.history
            this.dataChart.datasets[0].data = this.user.points.ratings
        }
    }
}
</script>