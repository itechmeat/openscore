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
        .then(() => {
          if (!this.state.tournaments || this.state.tournaments.length === 0) {
            return;
          }
          localStorage.setItem('tournaments', JSON.stringify(this.state.tournaments));
        })
        .catch(error => {
          // eslint-disable-next-line
          console.log('LOAD_TOURNAMENTS: ERROR:', error)
        });
    },
    LOAD_LOCAL_TOURNAMENTS({commit}) {
      commit('SET_TOURNAMENTS', JSON.parse(localStorage.getItem('tournaments')));
    }
  },
  mutations: {
    SET_TOURNAMENTS(state, payload) {
      state.tournaments = payload;
    },
  },
}
