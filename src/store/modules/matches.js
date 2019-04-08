import Vue from 'vue';

export default {
  state: {
    matches: [],
  },

  getters: {
    getMatches: (state) => state.matches,
  },

  actions: {
    loadMatches({commit}) {
      Vue.$db.collection('matches')
        .get()
        .then(querySnapshot => {
          let result = [];
          querySnapshot.forEach(m => {
            const match = m.data();
            match.id = m.id;
            result.push(match);
          });
          commit('setMatches', result);
        })
        .catch(error => {
          // eslint-disable-next-line
          console.log('loadMatches: ERROR:', error)
        });
    },
  },

  mutations: {
    setMatches(state, payload) {
      state.matches = payload;
    },
  },
}
