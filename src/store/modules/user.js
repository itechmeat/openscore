import firebase from 'firebase/app';
import 'firebase/auth';

export default {
  state: {
    user: {
      isAuthenticated: false,
      uid: null,
    },
  },
  actions: {
    SIGN_UP({commit}, payload) {
      commit('SET_PROCESSING', true);
      commit('CLEAR_ERROR');
      firebase.auth()
        .createUserWithEmailAndPassword(payload.email, payload.password)
        .then(user => {
          // eslint-disable-next-line
          console.log('SIGN_UP', user);
          commit('SET_PROCESSING', false);
        })
        .catch(function(error) {
          // eslint-disable-next-line
          console.log(error);
          commit('SET_PROCESSING', false);
          commit('SET_ERROR', error.message);
        });
    },
    SIGN_IN({commit}, payload) {
      commit('SET_PROCESSING', true);
      commit('CLEAR_ERROR');
      firebase.auth()
        .signInWithEmailAndPassword(payload.email, payload.password)
        .then(user => {
          // eslint-disable-next-line
          console.log('SIGN_IN', user);
          commit('SET_PROCESSING', false);
        })
        .catch(function(error) {
          // eslint-disable-next-line
          console.log(error);
          commit('SET_PROCESSING', false);
          commit('SET_ERROR', error.message);
        });
    },
    SIGN_OUT() {
      firebase.auth().signOut();
    },
    STATE_CHANGED({commit}, payload) {
      if (payload) {
        commit('SET_USER', payload.uid);
        return;
      }
      commit('UNSET_USER');
    },
  },
  mutations: {
    SET_USER(state, payload) {
      state.user.isAuthenticated = true;
      state.user.uid = payload;
    },
    UNSET_USER(state) {
      state.user.isAuthenticated = false;
      state.user.uid = null;
    },
  },
  getters: {
    isUserAuthenticated: (state) => state.user.isAuthenticated,
    userId: (state) => state.user.uid,
  },
};
