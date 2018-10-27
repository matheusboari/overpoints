import Vue from 'vue'
import App from './App.vue'

import router from './router'
import Utils from './plugins/utils_plugin'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import locale from 'element-ui/lib/locale/lang/pt-br'
import VueSweetalert2 from 'vue-sweetalert2'

Vue.use(ElementUI, { locale })
Vue.use(VueSweetalert2)
Vue.use(Utils)

Vue.prototype.$eventBus = new Vue()

new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
