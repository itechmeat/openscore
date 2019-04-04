import Vue from 'vue';

export default {
  state: {
    FakeMatchBoard: null,
  },

  getters: {
    getFakeMatchBoard: state => state.FakeMatchBoard,
  },

  actions: {
    loadFakeMatchBoard(context) {
      Vue.$db.collection('fakeMatch').doc('TbWQY8v08FWqcMpvQVXs')
        .onSnapshot(doc => {
          // eslint-disable-next-line
          console.log('load', doc.data());
          context.commit('setFakeMatchBoard', doc.data());
        });
    },
  },

  mutations: {
    setFakeMatchBoard(state, payload) {
      state.FakeMatchBoard = payload;
    },
  },
}
