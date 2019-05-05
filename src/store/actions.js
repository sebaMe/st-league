import _get from "lodash.get";
import firebase from "firebase";

import { MUTATIONS } from "./mutations";
import { getCurrentUser } from "../firebase/auth";
import { updateDocument, mergeDocument } from "../firebase/update";
import { fetchDocument } from "../firebase/fetch";
import { listenToDocument } from "../firebase/listen";
import { getSeasonBannerUrl } from "../firebase/storage";

export const actions = {
  // General

  setUserId({ commit }, userId) {
    if (userId) {
      commit(MUTATIONS.SET_USERID, userId);
    } else {
      commit(MUTATIONS.SET_USERID, undefined);
    }
  },

  // Fetches

  fetchDurac: async function({ commit }) {
    try {
      const durac = await fetchDocument("games/durac");
      commit(MUTATIONS.SET_DURAC, durac);
      return;
    } catch (err) {
      console.error(err);
    }
  },

  fetchSeasonBanner(context, seasonId) {
    return getSeasonBannerUrl(seasonId);
  },

  // Subscriptions

  subscribeUsers({ commit, getters }) {
    const unsub = listenToDocument("users/register1", function({ content }) {
      commit(MUTATIONS.SET_USERS, content);
    });
    return Promise.resolve(unsub);
  },

  subscribeDuracSeason({ commit, getters }) {
    const seasonId = getters.durac.season;
    const unsub = listenToDocument(`games/durac/seasons/${seasonId}`, function({
      name,
      start,
      end,
      players,
      matches,
      bannerUrl
    }) {
      commit(MUTATIONS.SET_DURAC_SEASON, {
        id: seasonId,
        name,
        start: start.toMillis(),
        end: end.toMillis(),
        players,
        matches: matches.map(ts => ts.toMillis()),
        bannerUrl
      });
    });
    return Promise.resolve(unsub);
  },

  // Updates

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
        await mergeDocument("users/register1", {
          content: { [uid]: { name: displayName } }
        });
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
