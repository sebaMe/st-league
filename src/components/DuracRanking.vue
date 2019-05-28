<template>
  <v-dialog :disabled="disabled" v-model="dialog" max-width="400" lazy>
    <vuc-btn :disabled="disabled" slot="activator" :icon="$icons.MAIN">Ranking</vuc-btn>

    <vuc-card v-if="dialog === true" class="durac-ranking">
      <template slot="header">
        <div class="ranking-title">Durac Ranking</div>
        <div class="season-name">{{duracSeason.name}}</div>
      </template>
      <ul class="ranking-list">
        <player-ranking v-for="player in playerRankingList" :key="player.id" :player="player"></player-ranking>
      </ul>
    </vuc-card>
  </v-dialog>
</template>

<script>
import _get from "lodash.get";
import _orderBy from "lodash.orderby";
import { mapActions, mapGetters } from "vuex";
import { resultTypes } from "../statics/enums";

import VucIcon from "../components/VucIcon";
import VucCard from "../components/VucCard";
import VucBtn from "../components/VucBtn";
import PlayerRanking from "../components/PlayerRanking";
import { cloneObject } from "../utils/commons";

export default {
  name: "DuracRanking",
  components: {
    VucCard,
    VucBtn,
    VucIcon,
    PlayerRanking
  },
  props: {
    disabled: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      dialog: false
    };
  },
  computed: {
    ...mapGetters(["durac", "duracSeason"]),
    rules() {
      return _get(this.durac, "rules");
    },
    maxHearts() {
      return _get(this.rules, "hearts");
    },
    playerRankingList() {
      const players = Object.values(_get(this.duracSeason, "players", {}));

      const processedRanking = players.map(({ id, history }) => {
        let absenceToStrokeHelper = 0;

        const result = {
          strokes: 0,
          winner: 0,
          lostHearts: 0,
          currentHearts: this.maxHearts,
          single: [],
          double: [],
          tripple: [],
          quadruple: [],
          quintuple: [],
          absence: [],
          bonusStroke: [],
          isDurac: false
        };

        // iterate players match-history and derive scoring-parameters
        history.forEach(([type, stroke, hearts], index, array) => {
          const strokeNum = parseInt(stroke);
          const heartNum = parseInt(hearts);
          
          result.isDurac = index === array.length - 1 && type === resultTypes.LOSER;

          // count winnings
          if (type === resultTypes.WINNER) result.winner++;

          // derive stroke from lost hearts
          absenceToStrokeHelper += heartNum;
          if (absenceToStrokeHelper >= this.maxHearts) {
            result.absence.push(index);
            absenceToStrokeHelper = absenceToStrokeHelper % this.maxHearts;
          }

          // count strokes and absence
          result.strokes += strokeNum;
          result.lostHearts += heartNum;
          result.currentHearts = this.maxHearts - (result.lostHearts % this.maxHearts);

          // calculate indeces of bonus-strokes
          for (let i = 1; i < strokeNum; i++) {
            result.bonusStroke.push(result.strokes + i);
          }

          // derive consecutive losses
          if (type === resultTypes.LOSER) {
            let prevIndex = index;
            let resultType = resultTypes.LOSER;
            let consecutiveLosses = 0;

            //TODO: check if theres any durac in the match. If yes count on!
            while (resultType === resultTypes.LOSER && prevIndex >= 0) {
              prevIndex--;
              resultType = _get(array, "0.0");
              consecutiveLosses++;
            }

            switch (consecutiveLosses) {
              case 1:
                result.single.push(index);
                break;
              case 2:
                result.double.push(index);
                break;
              case 3:
                result.tripple.push(index);
                break;
              case 4:
                result.quadruple.push(index);
                break;
              case 5:
                result.quintuple.push(index);
                break;
            }
          }
        });

        // add absence-days to strokes with max-heart-rule
        result.strokes += Math.floor(result.lostHearts / this.maxHearts);

        return {
          id,
          ...result
        };
      });

      return _orderBy(
        processedRanking,
        [
          "strokes",
          "quintuple.length",
          "quadruple.length",
          "tripple.length",
          "double.length",
          "absence.length",
          "winner.length"
        ],
        ["desc", "desc", "desc", "desc", "desc", "desc", "asc"]
      );
    }
  },
  methods: {}
};
</script>

<style lang="scss">
.durac-ranking {
  @include font-bangers;
  position: relative;
  width: 100%;
  .vuc-card_header {
    flex-direction: column;
    .season-name {
      font-size: 18px;
      text-align: center;
      color: $color-prim;
    }
  }
}
</style>
