import { computed, Ref } from "vue";

import { IGame, IPlayerResult } from "../stores/games.store";
import { ICreatePlayerPayload, IPlayer } from "../stores/players.store";

export const useGamePlayerResults = (
  playerList: Ref<IPlayer[]>,
  game: Ref<IGame>
) => {
  return computed(() => {
    const gamePlayerList = Object.values(game.value.players ?? {});

    return gamePlayerList.map((gamePlayer) => {
      const player = playerList.value?.find(
        (player) => player.id === gamePlayer.id
      );
      return {
        ...gamePlayer,
        avatar: player?.avatar,
        color: player?.color,
        tag: player?.tag
      } as IPlayerResult & ICreatePlayerPayload;
    });
  });
};
