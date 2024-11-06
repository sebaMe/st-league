import {
  deleteField,
  doc,
  getDoc,
  getFirestore,
  onSnapshot,
  serverTimestamp,
  setDoc,
  Timestamp
} from "firebase/firestore";
import { nanoid } from "nanoid";
import { defineStore } from "pinia";
import { shallowRef } from "vue";

import { useMainStore } from "./main.store";

interface ICreatePlayerPayload {
  tag: string;
  color: string;
  avatar: string;
}

export interface IPlayer extends ICreatePlayerPayload {
  id: string;
  created: Timestamp;
}

interface IPlayersDoc {
  list: {
    [key: string]: IPlayer;
  };
}

export const useDataStore = defineStore("data", () => {
  const mainStore = useMainStore();

  const db = getFirestore(mainStore.app);
  const playersDoc = doc(db, "Data", "Players");
  //const gamesDoc = doc(db, "Data", "Games1");

  const createPlayer = async (player: ICreatePlayerPayload) => {
    const id = nanoid();
    return setDoc(
      playersDoc,
      {
        list: {
          [id]: {
            id,
            created: serverTimestamp() as unknown,
            tag: player.tag,
            color: player.color,
            avatar: player.avatar ?? null
          }
        }
      } as IPlayersDoc,
      { merge: true }
    );
  };

  const editPlayer = async (player: IPlayer) => {
    return setDoc(
      playersDoc,
      {
        list: {
          [player.id]: {
            id: player.id,
            tag: player.tag,
            color: player.color,
            avatar: player.avatar ?? null
          }
        }
      } as IPlayersDoc,
      { merge: true }
    );
  };

  const deletePlayer = async (id: string) => {
    return setDoc(
      playersDoc,
      {
        list: {
          [id]: deleteField() as unknown
        }
      } as IPlayersDoc,
      { merge: true }
    );
  };

  const usePlayersData = () => {
    const playersData = shallowRef<IPlayersDoc>();

    const execute = async () => {
      const doc = await getDoc(playersDoc);
      if (doc.exists()) {
        playersData.value = doc.data() as IPlayersDoc;
      } else {
        console.warn("No such document", playersDoc.path);
      }
      return;
    };

    const subscribe = () => {
      const unsubscribe = onSnapshot(
        playersDoc,
        (doc) => {
          playersData.value = doc.data() as IPlayersDoc;
        },
        (error) => {
          console.error(error);
        }
      );

      return unsubscribe;
    };

    return {
      playersData,
      execute,
      subscribe
    };
  };

  return { createPlayer, editPlayer, deletePlayer, usePlayersData };
});
