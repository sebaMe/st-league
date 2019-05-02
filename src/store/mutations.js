import _get from "lodash.get";

export const MUTATIONS = {
  SET_USER: "SET_USER",
  RESET_USER: "RESET_USER"
};

export const mutations = {
  [MUTATIONS.SET_USER](state, payload) {
    if (payload) {
      state.user = { ...state.user, ...payload };
    } else {
      state.user = {};
    }
  },
  [MUTATIONS.RESET_USER](state) {
    state.user = {};
  }
};
