import firebase from 'firebase/app';
import 'firebase/auth';

export default {
  state: {
    user: {
      isAuthenticated: false,
      uid: null,
    },
  },

  getters: {
    isUserAuthenticated: (state) => state.user.isAuthenticated,
    getUserId: (state) => state.user.uid,
  },

  actions: {
    signUp({commit}, payload) {
      commit('setProcessing', true);
      commit('clearError');

      firebase.auth()
        .createUserWithEmailAndPassword(payload.email, payload.password)
        .then(user => {
          // eslint-disable-next-line
          console.log('signUp', user);
          commit('setProcessing', false);
        })
        .catch(function(error) {
          // eslint-disable-next-line
          console.log(error);
          commit('setProcessing', false);
          commit('setError', error.message);
        });
    },

    signIn({commit}, payload) {
      commit('setProcessing', true);
      commit('clearError');

      firebase.auth()
        .signInWithEmailAndPassword(payload.email, payload.password)
        .then(user => {
          // eslint-disable-next-line
          console.log('signIn', user);
          commit('setProcessing', false);
        })
        .catch(function(error) {
          // eslint-disable-next-line
          console.log(error);
          commit('setProcessing', false);
          commit('setError', error.message);
        });
    },

    signOut() {
      firebase.auth().signOut();
    },

    stateChanged({commit}, payload) {
      if (payload) {
        commit('setUser', payload.uid);
        return;
      }
      commit('unsetUser');
    },
  },

  mutations: {
    setUser(state, payload) {
      state.user.isAuthenticated = true;
      state.user.uid = payload;
    },

    unsetUser(state) {
      state.user.isAuthenticated = false;
      state.user.uid = null;
    },
  },
};
