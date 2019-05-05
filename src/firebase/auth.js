import firebase from "firebase/app";

import { router, ROUTES, INTERNAL_ROUTES } from "../router/router";
import { store } from "../store/store";

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
  let unsubUsers;
  let unsubDuracSeason;
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
  // subscribes relevant firebase documents
  firebase.auth().onAuthStateChanged(user => {
    if (user) {
      store.dispatch("setUserId", user.uid);
      store.dispatch("subscribeUsers").then(unsub => {
        unsubUsers = unsub;
      });
      store.dispatch("fetchDurac").then(() => {
        store.dispatch("subscribeDuracSeason").then(unsub => {
          unsubDuracSeason = unsub;
        });
      });

      // only redirect to /home if user comes from /sign-in
      if (router.currentRoute.name === LOGIN.name) {
        router.push(HOME.path);
      }
    } else {
      store.dispatch("setUserId", undefined);

      if (typeof unsubUsers === "function") {
        unsubUsers();
        unsubUsers = undefined;
      }

      if (typeof unsubDuracSeason === "function") {
        unsubDuracSeason();
        unsubDuracSeason = undefined;
      }

      router.push(LOGIN.path);
    }
  });
};
