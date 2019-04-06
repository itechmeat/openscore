import Vue from 'vue';

export default {
  state: {
    matches: [],
  },

  getters: {
    getMatches: (state) => state.matches,
  },

  actions: {
    LOAD_MATCHES({commit}) {
      Vue.$db.collection('matches')
        .get()
        .then(querySnapshot => {
          let result = [];
          querySnapshot.forEach(m => {
            const match = m.data();
            match.id = m.id;
            result.push(match);
          });
          commit('SET_MATCHES', result);
        })
        .catch(error => {
          // eslint-disable-next-line
          console.log('LOAD_MATCHES: ERROR:', error)
        });
    },
  },

  mutations: {
    SET_MATCHES(state, payload) {
      state.matches = payload;
    },
  },
}
