import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';
import Swimming from './views/Swimming.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/swimming',
      name: 'swimming',
      component: Swimming,
    },
  ],
});
