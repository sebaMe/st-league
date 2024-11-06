import { createEventHook } from "@vueuse/core";
import {
  AuthErrorCodes,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  User,
  UserCredential
} from "firebase/auth";
import { defineStore } from "pinia";
import { useToast } from "primevue/usetoast";
import { ref } from "vue";

import { useMainStore } from "./main.store";

export const useAuthStore = defineStore("auth", () => {
  const mainStore = useMainStore();
  const toast = useToast();
  const auth = getAuth(mainStore.app);

  const credentials = ref<UserCredential>();
  const user = ref<User>();
  const authenticating = ref(false);

  interface IAuthError extends Error {
    code: string;
  }

  const login = (email: string, password: string) =>
    new Promise<{
      emailValid: boolean;
      passwordValid: boolean;
      error?: IAuthError;
    }>((resolve) => {
      authenticating.value = true;

      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          credentials.value = userCredential;
          resolve({
            emailValid: true,
            passwordValid: true
          });
        })
        .catch((error: IAuthError) => {
          toast.add({
            severity: "error",
            summary: "Login Error",
            detail: error.message,
            life: 5000
          });
          authenticating.value = false;
          resolve({
            emailValid: error.code !== AuthErrorCodes.USER_DELETED,
            passwordValid: error.code !== AuthErrorCodes.INVALID_PASSWORD,
            error: error
          });
        });
    });

  const logout = () =>
    signOut(auth).catch((error) => {
      console.warn(error.message);
    });

  const checkAuthState = () =>
    new Promise<boolean>((resolve) => {
      const unsubscribe = onAuthStateChanged(auth, (fbUser) => {
        unsubscribe();
        if (fbUser) {
          resolve(true);
        }
        resolve(false);
      });
    });

  const authChangeHook = createEventHook<User | null>();
  onAuthStateChanged(auth, (fbUser) => {
    if (fbUser) {
      user.value = fbUser;
      authenticating.value = false;
    } else {
      user.value = undefined;
    }
    authChangeHook.trigger(fbUser);
  });

  return {
    login,
    logout,
    checkAuthState,
    authenticating,
    onAuthChange: authChangeHook.on,
    user
  };
});
