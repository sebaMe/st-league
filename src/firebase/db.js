import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";

import { config } from "../../private/firebase.config";

export let firestore = null;
export let storage = null;

export const initFB = () => {
  firebase.initializeApp(config);
  firestore = firebase.firestore();
  storage = firebase.storage().ref();
};
