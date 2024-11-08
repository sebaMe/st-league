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

export enum ResultTypes {
  WON = "w",
  LOST = "l",
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
  list: {
    [id: string]: IGame;
  };
}

export const useGamesStore = defineStore("games", () => {
  const mainStore = useMainStore();

  const db = getFirestore(mainStore.app);
  const gamesDoc = doc(db, "Data", "Games1");
  const data = shallowRef<IGamesDoc>();
  let unsub: Unsubscribe | undefined = undefined;

  const createGame = async (game: ICreateGamePayload) => {
    const id = nanoid();
    return setDoc(
      gamesDoc,
      {
        list: {
          [id]: {
            id,
            created: serverTimestamp() as unknown,
            players: game.players
          }
        }
      } as IGamesDoc,
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
      } as IGamesDoc,
      { merge: true }
    );
  };

  const deleteGame = async (id: string) => {
    return setDoc(
      gamesDoc,
      {
        list: {
          [id]: deleteField() as unknown
        }
      } as IGamesDoc,
      { merge: true }
    );
  };

  const update = async () => {
    const doc = await getDoc(gamesDoc);
    if (doc.exists()) {
      data.value = doc.data() as IGamesDoc;
    } else {
      console.warn("No such document", gamesDoc.path);
    }
  };

  const subscribe = () => {
    if (unsub === undefined) {
      unsub = onSnapshot(
        gamesDoc,
        (doc) => {
          data.value = doc.data() as IGamesDoc;
        },
        (error) => {
          console.error(error);
        }
      );
    }
  };

  const unsubscribe = () => {
    if (unsub) {
      unsubscribe();
      unsub = undefined;
    }
  };

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
    update,
    subscribe,
    unsubscribe,
    data,
    orderedGamesList
  };
});
