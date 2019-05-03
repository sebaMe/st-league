import firebase from "firebase";
import { config } from "../../private/firebase.config";

export let firestore = null;
export let storage = null;

export const initFB = () => {
  firebase.initializeApp(config);
  firestore = firebase.firestore();
  storage = firebase.storage().ref();
};
