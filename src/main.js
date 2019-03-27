import Vue from 'vue';
import './plugins/vuetify'
import App from './App.vue';
import router from './router';
import store from './store';
import VueLuxon from 'vue-luxon';
import Vuetify from 'vuetify/lib';
import { Ripple } from 'vuetify/lib/directives';
import firebaseConfig from './config/firebase';
import firebase from 'firebase/app';
import 'firebase/auth';

Vue.config.productionTip = false;

firebase.initializeApp(firebaseConfig);

Vue.use(VueLuxon, {
  localeLang: 'en',
});

Vue.use(Vuetify, {
  directives: {
    Ripple
  },
});

new Vue({
  router,
  store,
  render: h => h(App),
  created() {
    const vm = this;
    firebase.auth().onAuthStateChanged(function(user) {
      vm.$store.dispatch('STATE_CHANGED', user);
    });
  },
}).$mount('#app');
