import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import VueLuxon from 'vue-luxon';

Vue.config.productionTip = false;

Vue.use(VueLuxon, {
  localeLang: 'en',
});

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
