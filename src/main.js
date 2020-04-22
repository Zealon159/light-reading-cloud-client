import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import router from "./router"
import {postRequest} from "./utils/request"
import {postKeyValueRequest} from "./utils/request"
import {putRequest} from "./utils/request"
import {deleteRequest} from "./utils/request"
import {getRequest} from "./utils/request"
import db from "./utils/sessionStorage"
import * as config from "./utils/config"

Vue.config.productionTip = false

Vue.prototype.db = db
Vue.prototype.config = config
Vue.prototype.postRequest = postRequest;
Vue.prototype.postKeyValueRequest = postKeyValueRequest;
Vue.prototype.putRequest = putRequest;
Vue.prototype.deleteRequest = deleteRequest;
Vue.prototype.getRequest = getRequest;

new Vue({
  router,
  vuetify,
  render: h => h(App)
}).$mount('#app')
