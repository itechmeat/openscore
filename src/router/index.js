import Vue from 'vue';
import Router from 'vue-router';
import { MODULES, TOURNAMENTS, TOURNAMENT, BOARDS, CONTROL, DESKS } from '../router/sports';

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
    ...MODULES,
    ...TOURNAMENTS,
    ...TOURNAMENT,
    ...BOARDS,
    ...CONTROL,
    ...DESKS,
    {
      path: '*',
      name: '404',
      component: () => import('../views/PageNotFound'),
    }
  ],
});
