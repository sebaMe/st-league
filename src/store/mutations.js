import _get from "lodash.get";

export const MUTATIONS = {
  SET_USER: "SET_USER"
};

export const mutations = {
  [MUTATIONS.SET_USER](state, payload) {
    state.user = payload;
  }
};
