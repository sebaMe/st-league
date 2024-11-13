import {
  deleteField,
  doc,
  getDoc,
  getFirestore,
  onSnapshot,
  serverTimestamp,
  setDoc,
  Timestamp,
  Unsubscribe
} from "firebase/firestore";
import { orderBy } from "lodash-es";
import { nanoid } from "nanoid";
import { defineStore } from "pinia";
import { computed, shallowRef } from "vue";

import { useMainStore } from "./main.store";

export interface ICreatePlayerPayload {
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
    [id: string]: IPlayer;
  };
}

export const usePlayersStore = defineStore("players", () => {
  const mainStore = useMainStore();

  const db = getFirestore(mainStore.app);
  const playersDoc = doc(db, "Data", "Players");
  const data = shallowRef<IPlayersDoc>();
  let _unsubscribe: Unsubscribe | undefined = undefined;

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

  const editPlayer = async (playerId: string, player: ICreatePlayerPayload) => {
    return setDoc(
      playersDoc,
      {
        list: {
          [playerId]: {
            id: playerId,
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

  const update = async () => {
    const doc = await getDoc(playersDoc);
    if (doc.exists()) {
      data.value = doc.data() as IPlayersDoc;
    } else {
      console.warn("No such document", playersDoc.path);
    }
  };

  const subscribe = () => {
    if (_unsubscribe === undefined) {
      _unsubscribe = onSnapshot(
        playersDoc,
        (doc) => {
          data.value = doc.data() as IPlayersDoc;
        },
        (error) => {
          console.error(error);
        }
      );
    }
  };

  const unsubscribe = () => {
    if (_unsubscribe) {
      _unsubscribe();
      _unsubscribe = undefined;
    }
  };

  const orderedPlayersList = computed(() =>
    orderBy(Object.values(data.value?.list ?? {}), (player) => player.tag)
  );

  return {
    createPlayer,
    editPlayer,
    deletePlayer,
    update,
    subscribe,
    unsubscribe,
    data,
    orderedPlayersList
  };
});
