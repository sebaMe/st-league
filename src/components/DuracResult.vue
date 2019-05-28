<template>
  <ul class="durac-result">
    <li
      v-for="player in playerList"
      :key="player.id"
      class="player-result"
      :class="getResultClass(player.id)"
    >
      <div class="player-name">
        <vuc-icon>{{getResultIcon(player.id)}}</vuc-icon>
        {{player.name}}
      </div>

      <div class="player-score">
        <vuc-icon>{{$icons.STROKE}}</vuc-icon>
        +{{getStrokeResult(player.id)}}
      </div>

      <div class="player-hearts">
        <vuc-icon>{{$icons.HEART}}</vuc-icon>
        -{{getHeartResult(player.id)}}
      </div>
    </li>
  </ul>
</template>

<script>
import _get from "lodash.get";
import { mapActions, mapGetters } from "vuex";
import { resultTypes } from "../statics/enums";

import VucIcon from "../components/VucIcon";

export default {
  name: "DuracResult",
  components: {
    VucIcon
  },
  props: {
    matchId: {
      type: Number,
      default: 0
    },
    playerList: {
      type: Array,
      default: []
    }
  },
  computed: {
    ...mapGetters(["duracSeason"]),
    playerResults() {
      const matches = _get(this.duracSeason, "matches");
      const results = _get(this.duracSeason, "players");
      const playerIds = Object.keys(results);
      const matchIndex = matches.indexOf(this.matchId);

      if (matchIndex > -1) {
        return playerIds.reduce((obj, playerId) => {
          return {
            ...obj,
            [playerId]: _get(results, `${playerId}.history.${matchIndex}`)
          };
        }, {});
      }
      return {};
    }
  },
  methods: {
    getPlayerResult(playerId) {
      return _get(this.playerResults, playerId, {});
    },
    getResultType(playerId) {
      return this.getPlayerResult(playerId)[0];
    },
    getStrokeResult(playerId) {
      return this.getPlayerResult(playerId)[1];
    },
    getHeartResult(playerId) {
      return this.getPlayerResult(playerId)[2];
    },
    getResultIcon(playerId) {
      switch (this.getResultType(playerId)) {
        case resultTypes.PARTICIPATED:
          return this.$icons.PARTICIPATED;
        case resultTypes.LOSER:
          return this.$icons.LOSER;
        case resultTypes.WINNER:
          return this.$icons.WINNER;
        case resultTypes.ABSENT:
          return this.$icons.ABSENT;
      }
    },
    getResultClass(playerId) {
      switch (this.getResultType(playerId)) {
        case resultTypes.PARTICIPATED:
          return "x--participated";
        case resultTypes.LOSER:
          return "x--loser";
        case resultTypes.WINNER:
          return "x--winner";
        case resultTypes.ABSENT:
          return "x--absent";
      }
    }
  }
};
</script>

<style lang="scss">
.durac-result {
  @include animation-fade-slide-bottom;
  @include font-bangers;
  position: relative;
  width: 100%;
  .player-result {
    display: flex;
    flex: 1;
    align-items: center;
    justify-content: center;
    margin-top: 5px;
    transition: 0.2s ease-in-out;
    font-size: 25px;

    .player-name {
      display: flex;
      flex: 1;
      .vuc-btn_content {
        width: 100%;
      }
      i {
        flex: 0 0 40px;
      }
      span {
        flex: 1;
        text-align: left;
      }
    }
    .player-score,
    .player-hearts {
      display: flex;
      flex: 0 0 65px;
    }
    &.x--participated {
      .player-name,
      .player-score,
      .player-hearts {
        color: $color-participated;
        border-color: $color-participated;
      }
    }
    &.x--loser {
      .player-name,
      .player-score,
      .player-hearts {
        color: $color-loser;
        border-color: $color-loser;
      }
    }
    &.x--winner {
      .player-name,
      .player-score,
      .player-hearts {
        color: $color-winner;
        border-color: $color-winner;
      }
    }
    &.x--absent {
      opacity: 0.5;
      .player-name,
      .player-score,
      .player-hearts {
        border-color: $color-absent;
        color: $color-absent;
      }
    }
  }
}
</style>
