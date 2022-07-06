import Vue from "vue";
import { Toast } from "vant";
import App from "./App.vue";
import router from "./router";
import '@/assets/less/reset.less';

Vue.use(Toast);
Toast.setDefaultOptions(
  {
    duration: 1000,
    position: "top"
  }
);

Vue.config.productionTip = false;
/* eslint-disable */
// var vconsole = new window.VConsole();

new Vue({
  router,
  render: h => h(App)
}).$mount("#app");
