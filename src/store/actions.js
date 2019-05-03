import _get from "lodash.get";
import { MUTATIONS } from "./mutations";
import { authWithFB, signOutWithFB, getCurrentUser } from "../firebase/auth";
import { updateDocument, mergeDocument } from "../firebase/update";
import { fetchDocument, fetchCollection } from "../firebase/fetch";
import { listenToDocument } from "../firebase/listen";

export const actions = {
  // Authentication / Sign In / Sign Out
  signIn: async function({ commit, getters }, { login, pw }) {
    return authWithFB(login, pw);
  },
  signOut() {
    signOutWithFB().catch(({ message }) => {
      console.error(message);
    });
  },

  // User
  hydrateUser({ commit }) {
    const user = getCurrentUser();
    if (user) {
      const { uid, displayName } = user;
      commit(MUTATIONS.SET_USER, { uid, name: displayName });
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
        commit(MUTATIONS.SET_USER, { name: displayName });
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
      players
    }) {
      commit(MUTATIONS.SET_DURAC_SEASON, {
        id: seasonId,
        name,
        start: start.toDate(),
        end: end.toDate(),
        players
      });
    });
    return Promise.resolve(unsub);
  },

  recruitDuracPlayer(context, { seasonId, playerId }) {
    if (typeof seasonId === "string" && typeof playerId === "string") {
      return mergeDocument(`games/durac/seasons/${seasonId}`, {
        players: { [playerId]: { id: playerId, history: [] } }
      });
    }
  }
};
