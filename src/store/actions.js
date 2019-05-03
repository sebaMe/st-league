import _get from "lodash.get";
import firebase from "firebase";

import { MUTATIONS } from "./mutations";
import { getCurrentUser } from "../firebase/auth";
import { updateDocument, mergeDocument } from "../firebase/update";
import { fetchDocument, fetchCollection } from "../firebase/fetch";
import { listenToDocument } from "../firebase/listen";

export const actions = {
  // User
  setUserId({ commit }, userId) {
    if (userId) {
      commit(MUTATIONS.SET_USERID, userId);
    } else {
      commit(MUTATIONS.SET_USERID);
    }
  },
  updateUser: async function({ commit, getters }, { name }) {
    const user = getCurrentUser();
    const uid = _get(user, "uid");
    const displayName =
      typeof name === "string" && name.length >= 3
        ? name
        : "Musty McMusterface";

    if (uid) {
      try {
        await user.updateProfile({
          displayName
        });
        await updateDocument(`users/${uid}`, { name: displayName });
        commit(MUTATIONS.SET_USERS_PROPERTY, {
          id: uid,
          key: "name",
          value: displayName
        });
        return;
      } catch (err) {
        console.error(err);
      }
    }
  },

  fetchUsers({ commit, getters }) {
    fetchCollection("users")
      .then(users => {
        commit(MUTATIONS.SET_USERS, users);
      })
      .catch(() => {
        commit(MUTATIONS.SET_USERS);
      });
  },

  fetchDurac: async function({ commit }) {
    try {
      const durac = await fetchDocument("games/durac");
      commit(MUTATIONS.SET_DURAC, durac);
      return;
    } catch (err) {
      console.error(err);
    }
  },

  subscribeDuracSeason({ commit, getters }) {
    const seasonId = getters.durac.season;
    const unsub = listenToDocument(`games/durac/seasons/${seasonId}`, function({
      name,
      start,
      end,
      players,
      matches
    }) {
      commit(MUTATIONS.SET_DURAC_SEASON, {
        id: seasonId,
        name,
        start: start.toDate(),
        end: end.toDate(),
        players,
        matches: matches.map(ts => ts.toDate())
      });
    });
    return Promise.resolve(unsub);
  },

  recruitDuracPlayer({ getters }, playerId) {
    const seasonId = getters.currentDuracSeasonId;
    if (typeof seasonId === "string" && typeof playerId === "string") {
      mergeDocument(`games/durac/seasons/${seasonId}`, {
        players: { [playerId]: { id: playerId, history: [] } }
      });
    }
  },

  addDuracMatch({ getters }) {
    const seasonId = getters.currentDuracSeasonId;
    if (typeof seasonId === "string") {
      updateDocument(`games/durac/seasons/${seasonId}`, {
        matches: firebase.firestore.FieldValue.arrayUnion(new Date())
      });
    }
  }
};
