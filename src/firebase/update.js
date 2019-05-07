import { firestore } from "./db";

export async function updateDocument(path, fieldObject) {
  return firestore
    .doc(path)
    .update(fieldObject)
    .catch(err => {
      // The document probably doesn't exist.
      console.error("Error updating document: ", err);
    });
}

export async function mergeDocument(path, object = {}) {
  return firestore
    .doc(path)
    .set(object, { merge: true })
    .catch(err => {
      // The document probably doesn't exist.
      console.error("Error merging document: ", err);
    });
}
