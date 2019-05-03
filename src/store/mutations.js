import _get from "lodash.get";

export const MUTATIONS = {
  SET_USER: "SET_USER",
  RESET_USER: "RESET_USER",

  SET_USERS: "SET_USERS",
  SET_DURAC: "SET_DURAC",
  SET_DURAC_SEASON: "SET_DURAC_SEASON"
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
  },
  [MUTATIONS.SET_USERS](state, payload = {}) {
    state.users = payload;
  },
  [MUTATIONS.SET_DURAC](state, payload = {}) {
    state.durac = payload;
  },
  [MUTATIONS.SET_DURAC_SEASON](state, payload = {}) {
    state.duracSeason = payload;
  }
};
