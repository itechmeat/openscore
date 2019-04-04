import Vue from 'vue';
// import localMatch from '../../data/match';

export default {
  state: {
    FakeMatchControl: null,
  },

  getters: {
    getFakeMatchControl: state => state.FakeMatchControl,
  },

  actions: {
    loadFakeMatchControl(context) {
      Vue.$db.collection('fakeMatch').doc('TbWQY8v08FWqcMpvQVXs')
        .onSnapshot(doc => {
          if (!context.state.FakeMatchControl) {
            // eslint-disable-next-line
            console.log('load', doc.data());
            context.commit('setFakeMatchControl', doc.data());
            context.commit('nextFakeMatchControl');
            context.commit('resetFakeMatchControl');
            context.commit('setFakeMatchControl', context.state.FakeMatchControl);
          }
        });

      // context.commit('setFakeMatchControl', localMatch);
      // if (!context.state.FakeMatchControl) {
      //   context.commit('nextFakeMatchControl');
      //   context.commit('resetFakeMatchControl');
      // }
    },

    saveFakeMatchControl(context, data) {
      // eslint-disable-next-line
      console.log('save', data);
      // Vue.$db.collection("FakeMatchControl").doc('TbWQY8v08FWqcMpvQVXs').set(data);
      Vue.$db.collection("fakeMatch").doc('TbWQY8v08FWqcMpvQVXs').set(data);
    },

    setFakeMatchControl(context, match) {
      context.commit('setFakeMatchControl', match);
    },

    nextFakeMatchControl(context) {
      context.commit('nextFakeMatchControl');
      context.commit('resetFakeMatchControl');
    },

    resetFakeMatchControl(context) {
      context.commit('resetFakeMatchControl');
    },

    changeFakeMatchControlStatus(context, status) {
      context.commit('changeFakeMatchControlStatus', status);
    },

    setFakeMatchControlFail(context, name) {
      context.commit('setFakeMatchControlFail', name);
    },

    setFakeMatchControlTime(context, payload) {
      context.commit('setFakeMatchControlTime', payload);
    },
  },

  mutations: {
    nextFakeMatchControl(state) {
      if (!state.FakeMatchControl) return;

      const lines = [];
      buildRandomLines(state.FakeMatchControl.players.length);

      function buildRandomLines(length) {
        const number = Math.floor(Math.random() * length) + 1;
        if (!lines.includes(number)) {
          lines.push(number);
        }
        if (lines.length < length) {
          buildRandomLines(state.FakeMatchControl.players.length);
        }
      }

      state.FakeMatchControl.players = state.FakeMatchControl.players.map((player, index) => {
        return {
          ...player,
          line: lines[index],
          access: true,
        };
      });
    },

    resetFakeMatchControl(state) {
      if (!state.FakeMatchControl) return;

      state.FakeMatchControl.status = 'wait';

      state.FakeMatchControl.players = state.FakeMatchControl.players.map(player => {
        return {
          ...player,
          place: null,
          time: '',
          fail: false,
        };
      });
    },

    setFakeMatchControl(state, payload) {
      state.FakeMatchControl = payload;
    },

    changeFakeMatchControlStatus(state, payload) {
      state.FakeMatchControl.status = payload;
    },

    setFakeMatchControlFail(state, name) {
      const index = state.FakeMatchControl.players.findIndex(p => p.name === name);
      state.FakeMatchControl.players[index].fail = true;
    },

    setFakeMatchControlTime(state, payload) {
      const index = state.FakeMatchControl.players.findIndex(p => p.name === payload.name);
      state.FakeMatchControl.players[index].time = payload.time;
    },
  },
}
