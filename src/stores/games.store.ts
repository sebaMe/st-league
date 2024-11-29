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

export enum ResultTypes {
  LOST = "l",
  WON = "w",
  PARTICIPATED = "o",
  MISSED = "x"
}

export interface IPlayerResult {
  id: string;
  result: ResultTypes;
}

export interface ICreateGamePayload {
  players: {
    [id: string]: IPlayerResult;
  };
}

export interface IGame extends ICreateGamePayload {
  id: string;
  created: Timestamp;
}

interface IGamesDoc {
  list?: {
    [id: string]: IGame;
  };
}

export const useGamesStore = defineStore("games", () => {
  const mainStore = useMainStore();

  const db = getFirestore(mainStore.app);
  const gamesDoc: DocumentReference<IGamesDoc, IGamesDoc> = doc(
    db,
    "Data",
    "Games1"
  );
  const data = shallowRef<IGamesDoc>();
  const isSubscribed = ref(false);
  let _unsubscribe: Unsubscribe | undefined = undefined;

  const createGame = async (game: ICreateGamePayload) => {
    const id = nanoid();
    return setDoc(
      gamesDoc,
      {
        list: {
          [id]: {
            id,
            created: serverTimestamp(),
            players: game.players
          }
        }
      },
      { merge: true }
    );
  };

  const editGame = async (gameId: string, game: ICreateGamePayload) => {
    return setDoc(
      gamesDoc,
      {
        list: {
          [gameId]: {
            id: gameId,
            players: game.players
          }
        }
      },
      { merge: true }
    );
  };

  const deleteGame = async (id: string) => {
    return setDoc(
      gamesDoc,
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
        gamesDoc,
        (doc) => {
          isSubscribed.value = true;
          data.value = doc.data();
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

  // latest games first
  const orderedGamesList = computed(() =>
    orderBy(
      Object.values(data.value?.list ?? {}),
      (game) => game.created?.toMillis(),
      "desc"
    )
  );

  return {
    createGame,
    editGame,
    deleteGame,
    subscribe,
    isSubscribed,
    unsubscribe,
    data,
    orderedGamesList
  };
});
