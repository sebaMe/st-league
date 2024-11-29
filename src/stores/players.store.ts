import {
  deleteField,
  doc,
  DocumentReference,
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
import { computed, ref, shallowRef } from "vue";

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
  list?: {
    [id: string]: IPlayer;
  };
}

export const usePlayersStore = defineStore("players", () => {
  const mainStore = useMainStore();

  const db = getFirestore(mainStore.app);
  const playersDoc: DocumentReference<IPlayersDoc, IPlayersDoc> = doc(
    db,
    "Data",
    "Players"
  );
  const data = shallowRef<IPlayersDoc>();
  const isSubscribed = ref(false);
  let _unsubscribe: Unsubscribe | undefined = undefined;

  const createPlayer = async (player: ICreatePlayerPayload) => {
    const id = nanoid();
    return setDoc(
      playersDoc,
      {
        list: {
          [id]: {
            id,
            created: serverTimestamp(),
            tag: player.tag,
            color: player.color,
            avatar: player.avatar ?? null
          }
        }
      },
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
      },
      { merge: true }
    );
  };

  const deletePlayer = async (id: string) => {
    return setDoc(
      playersDoc,
      {
        list: {
          [id]: deleteField()
        }
      },
      { merge: true }
    );
  };

  // make sure to only have one subscription at any time
  const subscribe = () => {
    if (_unsubscribe === undefined) {
      _unsubscribe = onSnapshot(
        playersDoc,
        (doc) => {
          data.value = doc.data();
          isSubscribed.value = true;
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
      isSubscribed.value = false;
    }
  };

  const orderedPlayersList = computed(() =>
    orderBy(Object.values(data.value?.list ?? {}), (player) => player.tag)
  );

  return {
    createPlayer,
    editPlayer,
    deletePlayer,
    subscribe,
    isSubscribed,
    unsubscribe,
    data,
    orderedPlayersList
  };
});
