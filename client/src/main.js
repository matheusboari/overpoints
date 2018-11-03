import Vue from 'vue'
import App from './App.vue'

import router from './router'
import Utils from './plugins/utils_plugin'
import HttpPlugin from './plugins/http_plugin'
import VueTheMask from 'vue-the-mask'
import VeeValidate from 'vee-validate'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import locale from 'element-ui/lib/locale/lang/pt-br'
import VueSweetalert2 from 'vue-sweetalert2'

Vue.use(ElementUI, { locale })
Vue.use(VueSweetalert2)
Vue.use(VeeValidate)
Vue.use(VueTheMask)
Vue.use(HttpPlugin)
Vue.use(Utils)

Vue.prototype.$eventBus = new Vue()

new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
