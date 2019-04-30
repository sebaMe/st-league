import firebase from "firebase";
import _get from "lodash.get";
import { MUTATIONS } from "./mutations";
import { signOutWithFB, getAuthedUserId } from "../firebase/auth";
import { fetchDocument } from "../firebase/fetch";
import { updateDocument } from "../firebase/update";
import { storage } from "../firebase/db";

export const actions = {
  // Authentication / Sign In / Sign Out
  signOut() {
    signOutWithFB().catch(({ message }) => {
      console.error(message);
    });
  },
  // Vuex hydration
  hydrateUserData: async function({ commit }) {
    const { id, data } = await fetchDocument(`users/${getAuthedUserId()}`);
    commit(MUTATIONS.SET_USER, { id, ...data });
  },

  // Updating data
  updateUser: async function({ commit, getters }, userObj) {
    const userId = getters.user.id;
    if (userId) {
      await updateDocument(`users/${userId}`, userObj);
      commit(MUTATIONS.SET_USER, { ...getters.user, ...userObj });
      return;
    }
    throw new Error("no user-id", getters.user);
  }
};
