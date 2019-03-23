import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

const SPORTS = ['swimming'];
const MODULES = SPORTS.map(sport => {
  return {
    path: '/' + sport,
    component: () => import('./views/Match'),
    children: [
      { path: '',
        name: sport,
        component: () => import('./modules/' + sport),
      },
    ]
  };
});
const BOARDS = SPORTS.map(sport => {
  return {
    path: '/' + sport + '/board',
    name: sport + '_board',
    component: () => import('./modules/' + sport + '/board'),
  };
});
const DESKS = SPORTS.map(sport => {
  return {
    path: '/' + sport + '/desk',
    name: sport + '_desk',
    component: () => import('./modules/' + sport + '/desk'),
  };
});

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('./views/Home'),
    },
    ...MODULES,
    ...BOARDS,
    ...DESKS,
    {
      path: '*',
      name: '404',
      component: () => import('./views/PageNotFound'),
    }
  ],
});
