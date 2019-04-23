import Vue from 'vue';
import firebase from 'firebase/app';
import 'firebase/firestore';

export default {
  state: {
    tournaments: [],
  },

  getters: {
    getTournaments: (state) => state.tournaments,
  },

  actions: {
    loadTournaments({commit}) {
      Vue.$db.collection('tournaments')
        .get()
        .then(querySnapshot => {
          let result = [];
          querySnapshot.forEach(t => {
            const tournament = t.data();
            tournament.id = t.id;
            result.push(tournament);
          });
          commit('setTournaments', result);
        })
        .then(() => {
          if (!this.state.tournaments || this.state.tournaments.length === 0) return;
          localStorage.setItem('tournaments', JSON.stringify(this.state.tournaments));
        })
        .catch(error => {
          // eslint-disable-next-line
          console.log('loadTournaments: ERROR:', error)
        });
    },

    loadLocalTournaments({commit}) {
      const data = JSON.parse(localStorage.getItem('tournaments'));
      commit('setTournaments', data.tournaments);
    },

    async saveTournament({dispatch}, payload) {
      const server = Vue.$db.collection('tournaments');
      const serverTimestamp = firebase.firestore.FieldValue.serverTimestamp();
      let res;
      if (!payload.id) {
        await server.add({
          ...payload,
          creation_date: serverTimestamp,
        })
          .then(response => {
            dispatch('loadTournaments');
            res = response.id;
          });
        return res;
      }
      server.doc(payload.id)
        .set({
          ...payload,
          modification_date: serverTimestamp,
        })
        .then(() => {
          dispatch('loadTournaments');
        });
      return payload.id;
    },

    removeTournament({dispatch}, payload) {
      Vue.$db.collection('tournaments').doc(payload).delete()
        .then(() => dispatch('loadTournaments'));
    },
  },

  mutations: {
    setTournaments(state, payload) {
      state.tournaments = payload;
    },
  },
}
