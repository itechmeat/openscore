import Vue from 'vue';
import './plugins/vuetify'
import App from './App.vue';
import router from './router';
import store from './store';
import VueLuxon from 'vue-luxon';
// import Vuetify, {
//   VApp, // required
//   VContainer,
//   VContent,
//   VNavigationDrawer,
//   VFooter,
//   VToolbar,
//   VFadeTransition
// } from 'vuetify/lib';
// import { Ripple } from 'vuetify/lib/directives';

Vue.config.productionTip = false;

Vue.use(VueLuxon, {
  localeLang: 'en',
});

// Vue.use(Vuetify, {
//   components: {
//     VApp,
//     VContainer,
//     VContent,
//     VNavigationDrawer,
//     VFooter,
//     VToolbar,
//     VFadeTransition
//   },
//   directives: {
//     Ripple
//   },
// });

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
