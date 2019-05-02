import _get from "lodash.get";
import { MUTATIONS } from "./mutations";
import { authWithFB, signOutWithFB, getCurrentUser } from "../firebase/auth";
import { updateDocument } from "../firebase/update";

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
  // Vuex hydration
  hydrateUser({ commit }) {
    const user = getCurrentUser();
    if (user) {
      const { uid, displayName } = user;
      commit(MUTATIONS.SET_USER, { uid, name: displayName });
    }
  },

  // Updating data
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
  }
};
