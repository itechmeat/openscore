import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

const SPORTS = ['swimming'];
const MODULES = SPORTS.map(sport => {
  return {
    path: '/' + sport,
    component: () => import('./views/Sport'),
    children: [
      { path: '',
        name: sport,
        component: () => import('./modules/' + sport),
        props: {
          sport: sport,
        }
      },
    ],
  };
});
const TOURNAMENTS = SPORTS.map(sport => {
  return {
    path: '/' + sport + '/tournaments/',
    name: sport + '_tournaments',
    component: () => import('./modules/' + sport),
    props: {
      sport: sport,
    }
  };
});
const TOURNAMENT = SPORTS.map(sport => {
  return {
    path: '/' + sport + '/tournaments/:id',
    name: sport + '_tournament',
    component: () => import('./modules/' + sport + '/tournaments.vue'),
    props: {
      sport: sport,
    }
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
    ...TOURNAMENTS,
    ...TOURNAMENT,
    ...BOARDS,
    ...DESKS,
    {
      path: '*',
      name: '404',
      component: () => import('./views/PageNotFound'),
    }
  ],
});
