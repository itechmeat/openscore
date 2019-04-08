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

    setProcessing(state, payload) {
      state.processing = payload;
    },

    setError(state, payload) {
      state.error = payload;
    },

    clearError(state) {
      state.error = null;
    },
  },
}
