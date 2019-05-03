import { firestore } from "./db";

export function listenToDocument(path, cb) {
  const unsub = firestore.doc(path).onSnapshot(
    function(doc) {
      cb(doc.data());
    },
    function(err) {
      console.log(err);
    }
  );
  return unsub;
}
