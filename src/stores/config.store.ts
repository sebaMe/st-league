import {
  deleteField,
  doc,
  getFirestore,
  onSnapshot,
  setDoc,
  Timestamp,
  Unsubscribe
} from "firebase/firestore";
import { orderBy } from "lodash-es";
import { nanoid } from "nanoid";
import { defineStore } from "pinia";
import { computed, ref, shallowRef } from "vue";

import { useMainStore } from "./main.store";

export interface ISeasonPayload {
  start: Timestamp;
  end: Timestamp;
}

export interface ISeason extends ISeasonPayload {
  id: string;
}

export interface IScoringValues {
  won: number;
  lost: number;
  streak2: number;
  streak3: number;
  streakX: number;
}

interface IConfigDoc {
  maxLives: number;
  scoring: IScoringValues;
  seasons: {
    [id: string]: ISeason;
  };
}

export const useConfigStore = defineStore("config", () => {
  const mainStore = useMainStore();

  const db = getFirestore(mainStore.app);
  const configDoc = doc(db, "Data", "Config");
  const data = shallowRef<IConfigDoc>({
    maxLives: 5,
    scoring: {
      won: 2,
      lost: -1,
      streak2: 1,
      streak3: 2,
      streakX: 3
    },
    seasons: {}
  });
  const isSubscribed = ref(false);
  let _unsubscribe: Unsubscribe | undefined = undefined;

  const setMaxLives = async (maxLives: number) => {
    return setDoc(
      configDoc,
      {
        maxLives
      } as IConfigDoc,
      { merge: true }
    );
  };

  const setScoringValues = async (scoringValues: IScoringValues) => {
    return setDoc(
      configDoc,
      {
        scoring: scoringValues
      } as IConfigDoc,
      { merge: true }
    );
  };

  const createSeason = async (season: ISeasonPayload) => {
    const id = nanoid();
    return setDoc(
      configDoc,
      {
        seasons: {
          [id]: {
            id,
            start: season.start,
            end: season.end
          }
        }
      } as IConfigDoc,
      { merge: true }
    );
  };

  const deleteSeason = async (id: string) => {
    return setDoc(
      configDoc,
      {
        seasons: {
          [id]: deleteField() as unknown
        }
      } as IConfigDoc,
      { merge: true }
    );
  };

  // make sure to only have one subscription at any time
  const subscribe = () => {
    if (_unsubscribe === undefined) {
      _unsubscribe = onSnapshot(
        configDoc,
        (doc) => {
          data.value = doc.data() as IConfigDoc;
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

  // latest season first
  const orderedSeasonList = computed(() =>
    orderBy(
      Object.values(data.value?.seasons ?? {}),
      (season) => season.start?.toMillis(),
      "desc"
    )
  );

  return {
    setMaxLives,
    setScoringValues,
    createSeason,
    deleteSeason,
    subscribe,
    unsubscribe,
    isSubscribed,
    data,
    orderedSeasonList
  };
});
