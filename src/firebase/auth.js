import firebase from "firebase/app";
import "firebase/auth";

import { router, ROUTES, INTERNAL_ROUTES } from "../router/router";
import { store } from "../store/store";
import { MUTATIONS } from "../store/mutations";

export const getCurrentUser = () => {
  return firebase.auth().currentUser || undefined;
};

export async function authWithFB(login, pw) {
  await firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION);
  return await firebase.auth().signInWithEmailAndPassword(login, pw);
}

export async function signOutWithFB() {
  return await firebase.auth().signOut();
}

export const initAuthRouteGuard = () => {
  const { HOME } = ROUTES;
  const { LOGIN } = INTERNAL_ROUTES;
  // listens to route-changes
  // route-changes allowed if user is authed, else redirect to /sign-in page
  router.beforeEach(({ name }, from, next) => {
    if (getCurrentUser() || name === LOGIN.name) {
      next();
    } else {
      router.push(LOGIN.path);
    }
  });
  // listens to auth-state-changes
  // if auth-state changes user is redirected to /home (logged in) or /sign-in (logged out)
  // fetches data from firebase and sets initial vuex state
  firebase.auth().onAuthStateChanged(user => {
    if (user) {
      store.dispatch("hydrateUser");
      // only redirect to /home if user comes from /sign-in
      if (router.currentRoute.name === LOGIN.name) {
        router.push(HOME.path);
      }
    } else {
      store.commit(MUTATIONS.RESET_USER);
      router.push(LOGIN.path);
    }
  });
};
