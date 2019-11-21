import Vue from "vue";
import App from "./components/App.vue";
import "./registerServiceWorker";
import Vuex from 'vuex'
import Vuetify from 'vuetify';
import 'vuetify/dist/vuetify.min.css' // Ensure you are using css-loader
import VueRouter from 'vue-router';
import axios from 'axios'
import { createRouter } from "./routes";
import { createStore } from "./store";

Vue.config.productionTip = false;

Vue.use(Vuex)
Vue.use(Vuetify, {
    iconfont: 'mdi'
});
Vue.use(VueRouter);

Vue.prototype.$axios = axios
const store = createStore()
const router = createRouter()

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
