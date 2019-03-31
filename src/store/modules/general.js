export default {
  state: {
    connected: navigator.onLine,
    processing: false,
    error: null,
  },
  getters: {
    getConnectedStatus: state => state.connected,
    getProcessing: (state) => state.processing,
    getError: (state) => state.error,
  },
  actions: {
    setConnected (context, status) {
      context.commit('setConnected', status)
    },
  },
  mutations: {
    setConnected (state, payload) {
      state.connected = payload
    },
    SET_PROCESSING(state, payload) {
      state.processing = payload;
    },
    SET_ERROR(state, payload) {
      state.error = payload;
    },
    CLEAR_ERROR(state) {
      state.error = null;
    },
  },
}
