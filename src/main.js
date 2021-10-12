import 'core-js/stable'
import Vue from 'vue'
import App from './App'
import router from './router'
import CoreuiVue from '@coreui/vue'
import { iconsSet as icons } from './assets/icons/icons.js'
import store from './store'
import * as VueGoogleMaps from "vue2-google-maps";
import SweetModal from 'sweet-modal-vue/src/plugin.js'

Vue.use(SweetModal)

Vue.config.productionTip = false
Vue.config.performance = true
Vue.use(CoreuiVue)
Vue.prototype.$log = console.log.bind(console)
Vue.use(VueGoogleMaps, {
  load: {
    key: "AIzaSyCsE5KDJqjPpbTHsQFqSjnJHclQuCBw8c4",
    libraries: "places",
  },
});

new Vue({
  el: '#app',
  router,
  store,
  icons,
  template: '<App/>',
  components: {
    App
  }
})
