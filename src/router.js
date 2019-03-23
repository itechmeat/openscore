import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

const SPORTS = ['swimming'];
const BOARDS = SPORTS.map(sport => {
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

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('./views/Home'),
    },
    ...BOARDS,
    {
      path: '*',
      name: '404',
      component: () => import('./views/PageNotFound'),
    }
  ],
});
