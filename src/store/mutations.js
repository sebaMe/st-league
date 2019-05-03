import _set from "lodash.set";

export const MUTATIONS = {
  SET_USERID: "SET_USERID",

  SET_USERS: "SET_USERS",
  SET_USERS_PROPERTY: "SET_USERS_PROPERTY",
  SET_DURAC: "SET_DURAC",
  SET_DURAC_SEASON: "SET_DURAC_SEASON"
};

export const mutations = {
  [MUTATIONS.SET_USERID](state, userId) {
    state.userId = userId;
  },
  [MUTATIONS.SET_USERS](state, payload = {}) {
    state.users = payload;
  },
  [MUTATIONS.SET_USERS_PROPERTY](state, { id, key, value }) {
    _set(state, `users.${id}.${key}`, value);
  },
  [MUTATIONS.SET_DURAC](state, payload = {}) {
    state.durac = payload;
  },
  [MUTATIONS.SET_DURAC_SEASON](state, payload = {}) {
    state.duracSeason = payload;
  }
};
