<template>
  <v-dialog :disabled="disabled" v-model="dialog" max-width="400" lazy persistent>
    <vuc-btn slot="activator" :disabled="disabled" :icon="$options.icons.NEW">New Match</vuc-btn>

    <vuc-card v-if="dialog === true" class="durac-match">
      <template slot="header">
        <span class="match-number">{{`Match - ${matchNumber}`}}</span>
        <vuc-btn :icon="$options.icons.CLOSE" @click="dialog = false"></vuc-btn>
      </template>
      <div class="match-time">{{time | fullDate}}</div>
      <ul class="player-list">
        <li
          v-for="player in playerList"
          :key="player.id"
          class="player-item"
          :class="getResultClass(player.id)"
        >
          <vuc-btn
            class="player-name"
            :icon="getResultIcon(player.id)"
            @click="spinResultType(player.id)"
          >
            <span>{{player.name}}</span>
          </vuc-btn>
          <vuc-btn
            class="player-score"
            :icon="$options.icons.STROKE"
            @click="spinResultScore(player.id)"
          >+{{getStrokeResult(player.id)}}</vuc-btn>
          <vuc-btn
            class="player-hearts"
            :icon="$options.icons.HEART"
            @click="spinHeartScore(player.id)"
          >-{{getHeartResult(player.id)}}</vuc-btn>
        </li>
      </ul>
      <vuc-btn
        charge
        :disabled="playerList.length < 4"
        :loading="submitting"
        slot="footer"
        @click="submitMatch"
      >Submit</vuc-btn>
    </vuc-card>
  </v-dialog>
</template>

<script>
import _set from "lodash.set";
import _get from "lodash.get";
import { mapActions, mapGetters } from "vuex";
import { cloneObject, replaceCharAt } from "../utils/commons";
import { resultTypes } from "../statics/enums";

import VucCard from "../components/VucCard";
import VucBtn from "../components/VucBtn";
import VucIcon from "../components/VucIcon";
import { notifyError, notifySuccess } from "../plugins/vue.notifications";

export default {
  name: "DuracMatchCard",
  components: {
    VucCard,
    VucBtn,
    VucIcon
  },
  props: {
    playerList: {
      type: Array,
      default: []
    },
    matchList: {
      type: Array,
      default: []
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      dialog: false,
      submitting: false,
      time: undefined,
      playerResults: {}
    };
  },
  watch: {
    dialog: {
      handler(val) {
        if (val === true || this.time === undefined) {
          this.initData();
        }
      },
      immediate: true
    }
  },
  computed: {
    matchNumber() {
      const num = this.matchList.length + 1;
      return num < 10 ? "0" + num : num;
    },
    hasLoser() {
      return (
        Object.values(this.playerResults).findIndex(result => {
          return result[0] === resultTypes.LOSER;
        }) !== -1
      );
    },
    hasWinner() {
      return (
        Object.values(this.playerResults).findIndex(result => {
          return result[0] === resultTypes.WINNER;
        }) !== -1
      );
    },
    isMostRecentMatch() {
      const len = this.matchList.length;
      if (len > 0) {
        return this.time > this.matchList[0];
      }
      return true;
    }
  },
  methods: {
    ...mapActions(["uploadDuracMatch"]),
    initData() {
      this.time = new Date();
      this.playerResults = cloneObject(this.playerList).reduce((obj, item) => {
        return { ...obj, [item.id]: `${resultTypes.PARTICIPATED}00` };
      }, {});
    },
    getPlayerResult(playerId) {
      return _get(this.playerResults, playerId);
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
    spinResultType(playerId) {
      const playerResult = this.getPlayerResult(playerId);

      switch (this.getResultType(playerId)) {
        case resultTypes.PARTICIPATED:
          if (this.hasLoser && !this.hasWinner) {
            _set(this.playerResults, playerId, `${resultTypes.WINNER}00`);
          } else if (this.hasLoser && this.hasWinner) {
            _set(this.playerResults, playerId, `${resultTypes.ABSENT}01`);
          } else {
            _set(this.playerResults, playerId, `${resultTypes.LOSER}10`);
          }
          break;
        case resultTypes.LOSER:
          if (this.hasWinner) {
            _set(this.playerResults, playerId, `${resultTypes.ABSENT}01`);
          } else {
            _set(this.playerResults, playerId, `${resultTypes.WINNER}00`);
          }
          break;
        case resultTypes.WINNER:
          _set(this.playerResults, playerId, `${resultTypes.ABSENT}01`);
          break;
        case resultTypes.ABSENT:
          _set(this.playerResults, playerId, `${resultTypes.PARTICIPATED}00`);
          break;
      }
    },
    spinResultScore(playerId) {
      const playerResult = this.getPlayerResult(playerId);
      const strokeResult = parseInt(this.getStrokeResult(playerId));
      const newResult = strokeResult >= 4 ? 0 : strokeResult + 1;

      _set(
        this.playerResults,
        playerId,
        replaceCharAt(playerResult, 1, newResult)
      );
    },
    spinHeartScore(playerId) {
      const playerResult = this.getPlayerResult(playerId);
      const heartScore = parseInt(this.getHeartResult(playerId));
      const newResult = heartScore >= 4 ? 0 : heartScore + 1;

      _set(
        this.playerResults,
        playerId,
        replaceCharAt(playerResult, 2, newResult)
      );
    },
    getResultIcon(playerId) {
      switch (this.getResultType(playerId)) {
        case resultTypes.PARTICIPATED:
          return this.$options.icons.PARTICIPATED;
        case resultTypes.LOSER:
          return this.$options.icons.LOSER;
        case resultTypes.WINNER:
          return this.$options.icons.WINNER;
        case resultTypes.ABSENT:
          return this.$options.icons.ABSENT;
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
    },
    submitMatch() {
      const results = cloneObject(this.playerResults);
      if (this.isMostRecentMatch) {
        this.submitting = true;
        this.uploadDuracMatch({ time: this.time, playerResults: results }).then(
          () => {
            this.submitting = false;
            this.dialog = false;
            notifySuccess(
              "Hooray! Match was submitted successfully..."
            );
          }
        );
      } else {
        notifyError(
          "There's a more recent game! Too slow buddy..."
        );
        this.dialog = false;
      }
    }
  }
};
</script>

<style lang="scss">
.durac-match {
  .vuc-card_header {
    display: flex;
    .match-number {
      flex: 1;
      text-align: center;
    }
  }
  .match-time {
    @include font-bangers;
    color: $color-prim;
    text-align: center;
    font-size: 18px;
  }
  .player-list {
    .player-item {
      display: flex;
      justify-content: center;
      margin-top: 5px;
      transition: 0.2s ease-in-out;

      .player-name {
        flex: 1;
        .vuc-btn_content {
          width: 100%;
        }
        i {
          flex: 0 0 40px;
          font-size: 28px;
        }
        span {
          flex: 1;
          text-align: left;
        }
      }
      .player-score,
      .player-hearts {
        flex: 0 0 65px;
      }
      &.x--participated {
        .player-name,
        .player-score,
        .player-hearts {
          color: $color-participated;
          border-color: $color-participated;
          &:active {
            background-color: $color-participated;
          }
        }
      }
      &.x--loser {
        .player-name,
        .player-score,
        .player-hearts {
          color: $color-loser;
          border-color: $color-loser;
          &:active {
            background-color: $color-loser;
          }
        }
      }
      &.x--winner {
        .player-name,
        .player-score,
        .player-hearts {
          color: $color-winner;
          border-color: $color-winner;
          &:active {
            background-color: $color-winner;
          }
        }
      }
      &.x--absent {
        opacity: 0.5;
        .player-name,
        .player-score,
        .player-hearts {
          border-color: $color-absent;
          color: $color-absent;
          &:active {
            background-color: $color-absent;
          }
        }
      }
    }
  }
}
</style>
