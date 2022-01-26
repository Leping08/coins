import { createStore } from "vuex";

export default createStore({
  state: {
    fluxBallance: 0,
    ravencoinBallance: 0,
  },
  getters: {
    total: (state) => {
      return state.fluxBallance + state.ravencoinBallance;
    },
  },
  mutations: {
    updateFlux(state, value) {
      state.fluxBallance = value;
    },
    updateRavencoin(state, value) {
      state.ravencoinBallance = value;
    },
  },
  actions: {},
  modules: {},
});
