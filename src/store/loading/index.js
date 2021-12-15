export default {
  namespaced: true,

  state: {
    isLoading: false,
  },

  getters: {
    isLoading: ({ isLoading }) => isLoading,
  },

  mutations: {
    activate(state) {
      state.isLoading = true;
    },
    deactivate(state) {
      state.isLoading = false;
    },
  },

  actions: {
    activate({ commit }) {
      commit("activate");
    },
    deactivate({ commit }) {
      commit("deactivate");
    },
  },
};
