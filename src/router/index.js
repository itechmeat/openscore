import Vue from 'vue';
import Router from 'vue-router';
import Meta from 'vue-meta';
import * as pages from '../router/sports';

Vue.use(Router);
Vue.use(Meta, {
  keyName: 'metaInfo',
  attribute: 'data-vue-meta',
});

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/Home'),
    },
    ...pages.MODULES,
    ...pages.TOURNAMENTS,
    ...pages.TOURNAMENT,
    ...pages.TOURNAMENT_EDIT,
    ...pages.TOURNAMENT_CREATE,
    ...pages.BOARDS,
    ...pages.CONTROL,
    ...pages.DESKS,
    {
      path: '*',
      name: '404',
      component: () => import('../views/PageNotFound'),
    }
  ],
});
