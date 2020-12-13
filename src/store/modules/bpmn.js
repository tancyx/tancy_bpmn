// initial state
const state = () => ({
  modeler: {},
  element: {}
});

// getters
const getters = {};

// actions
const actions = {};

// mutations
const mutations = {
  setModeler(state, modeler) {
    state.modeler = modeler;
  },
  setElement(state, element) {
    state.element = element;
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
