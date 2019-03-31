import Vue from 'vue';
import Router from 'vue-router';
import { MODULES, TOURNAMENTS, TOURNAMENT, BOARDS, DESKS } from '../router/sports';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/Home'),
    },
    {
      path: '/control',
      name: 'control',
      component: () => import('../modules/swimming/control'),
    },
    ...MODULES,
    ...TOURNAMENTS,
    ...TOURNAMENT,
    ...BOARDS,
    ...DESKS,
    {
      path: '*',
      name: '404',
      component: () => import('../views/PageNotFound'),
    }
  ],
});
