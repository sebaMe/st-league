import _get from "lodash.get";

export const getters = {
  userId(state) {
    return state.userId;
  },
  userName(state, getters) {
    return _get(getters.users, `${getters.userId}.name`);
  },
  users(state) {
    return state.users;
  },
  durac(state) {
    return state.durac;
  },
  currentDuracSeasonId(state, getters) {
    return _get(getters.durac, "season");
  },
  duracSeason(state) {
    return state.duracSeason;
  }
};
