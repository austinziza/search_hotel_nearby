import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { GooglePlacesAutocomplete } from 'vue-better-google-places-autocomplete'
import Loading from 'vue-loading-overlay'
import 'vue-loading-overlay/dist/vue-loading.css'

Vue.component('google-places-autocomplete', GooglePlacesAutocomplete)
Vue.use(Loading)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
