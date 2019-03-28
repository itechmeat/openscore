import Vue from 'vue';

export default {
  state: {
    tournaments: [],
  },
  getters: {
    getTournaments: (state) => state.tournaments,
  },
  actions: {
    LOAD_TOURNAMENTS({commit}) {
      Vue.$db.collection('tournaments')
        .get()
        .then(querySnapshot => {
          let result = [];
          querySnapshot.forEach(t => {
            const tournament = t.data();
            tournament.id = t.id;
            result.push(tournament);
          });
          commit('SET_TOURNAMENTS', result);
        })
        // eslint-disable-next-line
        .catch(error => console.log(error));
    },
  },
  mutations: {
    SET_TOURNAMENTS(state, payload) {
      state.tournaments = payload;
    },
  },
}
