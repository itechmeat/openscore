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

    SAVE_TOURNAMENT({dispatch}, payload) {
      const server = Vue.$db.collection('tournaments');
      const serverTimestamp = firebase.firestore.FieldValue.serverTimestamp();
      // const setTimestamp = firebase.firestore.FieldValue.serverTimestamp();
      if (!payload.id) {
        server.add({
          ...payload,
          creation_date: serverTimestamp,
          start_date: firebase.firestore.Timestamp.fromDate(new Date("December 10, 1815")),
          end_date: 'Timestamp(seconds=1553931613, nanoseconds=0)',
        })
          .then(() => dispatch('LOAD_TOURNAMENTS'));
        return;
      }
      server.doc(payload.id)
        .set({
          ...payload,
          modification_date: serverTimestamp,
          start_date: 'Timestamp(seconds=1553931613, nanoseconds=0)',
          end_date: 'Timestamp(seconds=1553931613, nanoseconds=0)',
        })
        .then(() => dispatch('LOAD_TOURNAMENTS'));
    },

    REMOVE_TOURNAMENT({dispatch}, payload) {
      Vue.$db.collection('tournaments').doc(payload).delete()
        .then(() => dispatch('LOAD_TOURNAMENTS'));
    }
  },

  mutations: {
    SET_TOURNAMENTS(state, payload) {
      state.tournaments = payload;
    },
  },
}
