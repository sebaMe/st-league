import _set from "lodash.set";
import _get from "lodash.get";
import firebase from "firebase/app";

import { MUTATIONS } from "./mutations";
import { getCurrentUser } from "../firebase/auth";
import { mergeDocument } from "../firebase/update";
import { fetchDocument } from "../firebase/fetch";
import { listenToDocument } from "../firebase/listen";
import { getSeasonBannerUrl } from "../firebase/storage";
import { firestore } from "../firebase/db";
import { cloneObject } from "../utils/commons";

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

  subscribeUsers({ commit }) {
    const unsub = listenToDocument("users/register1", function(doc) {
      commit(MUTATIONS.SET_USERS, doc);
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

  updateUser: async function({ commit }, { name }) {
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
          [uid]: { name: displayName }
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

  uploadDuracMatch({ getters }, { time, playerResults }) {
    const seasonId = getters.currentDuracSeasonId;
    const season = getters.duracSeason;
    const playerIds = Object.keys(playerResults);

    const docRef = firestore.doc(`games/durac/seasons/${seasonId}`);
    const batch = firestore.batch();

    playerIds.forEach(playerId => {
      const playerPath = `players.${playerId}.history`;
      const playerResult = playerResults[playerId];
      const playerHistoryClone = cloneObject(_get(season, playerPath));

      playerHistoryClone.push(playerResult);

      batch.update(docRef, {
        [playerPath]: playerHistoryClone
      });
    });

    batch.update(docRef, {
      matches: firebase.firestore.FieldValue.arrayUnion(time)
    });

    return batch.commit();
  },

  createBackupJson({ getters }) {
    const backupObj = {};
    const season = getters.duracSeason;

    _set(backupObj, "users.register1", getters.users);
    _set(backupObj, "games.durac", getters.durac);
    _set(backupObj, `games.durac.seasons.${season.id}`, season);

    try {
      return URL.createObjectURL(
        new Blob([JSON.stringify(backupObj)], { type: "application/json" })
      );
    } catch (err) {
      console.error(err);
    }
  }
};
