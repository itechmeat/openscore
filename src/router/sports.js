import SPORTS from "../data/sports";

export const MODULES = SPORTS.map(sport => {
  return {
    path: '/' + sport.slug,
    component: () => import('../views/Sport'),
    children: [
      {
        ..._setOptions(
          sport,
          '/',
          sport.slug,
        ),
        component: () => import('../modules/' + sport.slug),
      },
    ],
  };
});

export const TOURNAMENTS = SPORTS.map(sport => {
  return {
    ..._setOptions(
      sport,
      '/' + sport.slug + '/tournaments/',
      sport.slug + '_tournaments',
    ),
    component: () => import('../modules/' + sport.slug),
  };
});

export const TOURNAMENT_CREATE = SPORTS.map(sport => {
  return {
    ..._setOptions(
      sport,
      '/' + sport.slug + '/create',
      sport.slug + '_tournament_create',
    ),
    component: () => import('../views/SportForm.vue'),
  };
});

export const TOURNAMENT = SPORTS.map(sport => {
  return {
    ..._setOptions(
      sport,
      '/' + sport.slug + '/tournaments/:id',
      sport.slug + '_tournament',
    ),
    component: () => import('../modules/' + sport.slug + '/tournament.vue'),
  };
});

export const TOURNAMENT_EDIT = SPORTS.map(sport => {
  return {
    ..._setOptions(
      sport,
      '/' + sport.slug + '/tournaments/:id/edit',
      sport.slug + '_tournament_edit',
    ),
    component: () => import('../views/SportForm.vue'),
  };
});

export const BOARDS = SPORTS.map(sport => {
  return {
    ..._setOptions(
      sport,
      '/' + sport.slug + '/board',
      sport.slug + '_board',
    ),
    component: () => import('../modules/' + sport.slug + '/board'),
  };
});

export const CONTROL = SPORTS.map(sport => {
  return {
    ..._setOptions(
      sport,
      '/' + sport.slug + '/control',
      sport.slug + '_control',
    ),
    component: () => import('../modules/' + sport.slug + '/control'),
  };
});

export const DESKS = SPORTS.map(sport => {
  return {
    ..._setOptions(
      sport,
      '/' + sport.slug + '/desk',
      sport.slug + '_desk',
    ),
    component: () => import('../modules/' + sport.slug + '/desk'),
  };
});

function _setOptions(sport, path, name, props) {
  return {
    path,
    name,
    props: {
      ...props,
      sportName: sport.name,
      sportSlug: sport.slug,
    }
  }
}
