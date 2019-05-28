import _set from "lodash.set";
import { fetchDocument, fetchCollection } from "./fetch";

export async function createBackupJson() {
  const backupObj = {};

  const userDocuments = await fetchDocument("users/register1");
  const duracDocument = await fetchDocument("games/durac");
  const duracSeasons = await fetchCollection("games/durac/seasons");

  _set(backupObj, "users.register1", userDocuments);
  _set(backupObj, "games.durac", duracDocument);
  _set(backupObj, `games.durac.seasons.${duracSeasons.id}`, duracSeasons);

  return URL.createObjectURL(
    new Blob([JSON.stringify(backupObj)], { type: "application/json" })
  );
}
