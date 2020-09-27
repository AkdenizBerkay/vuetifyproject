import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify';
import axios from 'axios';



Vue.prototype.$http = axios

axios.defaults.baseURL = process.env.VUE_APP_BASE_URL;

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')

Vue.config.productionTip = false