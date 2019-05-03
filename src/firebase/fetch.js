import { firestore } from "./db";
import _set from "lodash.set";

export async function fetchCollectionCustom(fsRequest) {
  let obj = {};
  try {
    const collection = await fsRequest.get();
    if (collection.size === 1) {
      collection.forEach(doc => {
        obj = { id: doc.id, ...doc.data() };
      });
    } else {
      collection.forEach(doc => {
        _set(obj, doc.id, { id: doc.id, ...doc.data() });
      });
    }

    return obj;
  } catch (err) {
    console.error(err);
  }
}

export const fetchCollection = path => {
  return fetchCollectionCustom(firestore.collection(path));
};

export const fetchCollectionWhere = (path, argA, comperitor, argB) => {
  return fetchCollectionCustom(
    firestore.collection(path).where(argA, comperitor, argB)
  );
};

export async function fetchDocument(path, withId = false) {
  try {
    const doc = await firestore.doc(path).get();
    if (doc.exists) {
      return withId ? { id: doc.id, data: doc.data() } : doc.data();
    }
    throw new Error(`error while fetching document ${path}`);
  } catch (err) {
    console.error(err);
  }
}
