import 'material-design-icons-iconfont/dist/material-design-icons.css'
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
import 'firebase/firestore';

Vue.config.productionTip = false;

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
Vue.$db = db;

Vue.use(VueLuxon, {
  localeLang: 'en',
});

Vue.use(Vuetify, {
  iconfont: 'md',
  directives: {
    Ripple
  },
});

new Vue({
  router,
  store,
  render: h => h(App),
  created() {
    window.addEventListener('offline', () => {
      store.dispatch('setConnected', false)
    });
    window.addEventListener('online', () => {
      store.dispatch('setConnected', true)
    });
    const vm = this;
    firebase.auth().onAuthStateChanged(function(user) {
      vm.$store.dispatch('stateChanged', user);
    });
  },
}).$mount('#app');
