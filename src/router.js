import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

const SPORTS = [
  {
    name: 'Swimming',
    slug: 'swimming',
  },
];

const MODULES = SPORTS.map(sport => {
  return {
    path: '/' + sport.slug,
    component: () => import('./views/Sport'),
    children: [
      {
        ...setOptions(
          sport,
          '/',
          sport.slug,
        ),
        component: () => import('./modules/' + sport.slug),
      },
    ],
  };
});
const TOURNAMENTS = SPORTS.map(sport => {
  return {
    ...setOptions(
      sport,
      '/' + sport.slug + '/tournaments/',
      sport.slug + '_tournaments',
    ),
    component: () => import('./modules/' + sport.slug),
  };
});
const TOURNAMENT = SPORTS.map(sport => {
  return {
    ...setOptions(
      sport,
      '/' + sport.slug + '/tournaments/:id',
      sport.slug + '_tournament',
    ),
    component: () => import('./modules/' + sport.slug + '/tournaments.vue'),
  };
});
const BOARDS = SPORTS.map(sport => {
  return {
    ...setOptions(
      sport,
      '/' + sport.slug + '/board',
      sport.slug + '_board',
    ),
    component: () => import('./modules/' + sport.slug + '/board'),
  };
});
const DESKS = SPORTS.map(sport => {
  return {
    ...setOptions(
      sport,
      '/' + sport.slug + '/desk',
      sport.slug + '_desk',
    ),
    component: () => import('./modules/' + sport.slug + '/desk'),
  };
});

function setOptions(sport, path, name) {
  return {
    path,
    name,
    props: {
      sportName: sport.name,
      sportSlug: sport.slug,
    }
  }
}

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
