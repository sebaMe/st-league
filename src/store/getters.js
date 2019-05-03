import _get from "lodash.get";

export const getters = {
  user(state) {
    return state.user;
  },
  users(state) {
    return state.users;
  },
  durac(state) {
    return state.durac;
  },
  duracSeason(state) {
    return state.duracSeason;
  }
};
