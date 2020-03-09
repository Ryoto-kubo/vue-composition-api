import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './components/plugins/vuetify'
import VueCompositionApi from '@vue/composition-api'
import Materials from '@/components/plugins/materials'

Vue.use(Materials)
Vue.use(VueCompositionApi)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App),
}).$mount('#app')
