import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { GooglePlacesAutocomplete } from 'vue-better-google-places-autocomplete'

Vue.component('google-places-autocomplete', GooglePlacesAutocomplete)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
