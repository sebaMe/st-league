<template>
  <v-dialog v-model="dialog" max-width="400" lazy persistent>
    <vuc-btn slot="activator" :icon="$options.icons.NEW">New Match</vuc-btn>

    <vuc-card class="durac-match">
      <template slot="header">
        <vuc-icon color="primary">{{$options.icons.DURAC}}</vuc-icon>
        <div class="durac-title">{{durac.name}}</div>
        <vuc-btn :icon="$options.icons.CLOSE" @click="dialog = false"></vuc-btn>
      </template>
      <div class="match-info">
        <span class="match-number">{{`Match ${matchNumber}`}}</span>
        <span class="match-time">{{time | fullDate}}</span>
      </div>
      <ul class="player-list">
        <li v-for="player in playerList" :key="player.id" class="player-item">
          <vuc-btn class="player-name" :icon="$options.icons.WINNER"><span>{{player.name}}</span></vuc-btn>
          <vuc-btn class="player-score" :icon="$options.icons.ADD_SCORE">2</vuc-btn>
          <vuc-btn class="player-hearts" :icon="$options.icons.HEART">2</vuc-btn>
        </li>
      </ul>
    </vuc-card>
  </v-dialog>
</template>

<script>
import _get from "lodash.get";
import _orderBy from "lodash.orderby";
import { mapActions, mapGetters } from "vuex";

import VucCard from "../components/VucCard";
import VucBtn from "../components/VucBtn";
import VucIcon from "../components/VucIcon";

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
    }
  },
  data() {
    return {
      dialog: false,
      time: new Date()
    };
  },
  watch: {
    dialog: {
      handler(val) {
        if (val === true) this.time = new Date();
      },
      immediate: true
    }
  },
  methods: {
    ...mapActions(["recruitDuracPlayer", "addDuracMatch"])
  },
  computed: {
    ...mapGetters(["users", "durac", "duracSeason"]),
    matchNumber() {
      const num = this.matchList.length + 1;
      return num < 10 ? "0" + num : num;
    }
  }
};
</script>

<style lang="scss">
.durac-match {
  .vuc-card_header {
    display: flex;
    .durac-title {
      flex: 1;
    }
  }
  .match-info {
    display: flex;
    justify-content: space-evenly;
    color: $color-prim;
    font-size: 14px;
  }
  .player-list {
    .player-item {
      display: flex;
      justify-content: center;
      margin-top: 5px;
    }
    .player-name {
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
    .player-score, .player-hearts {
      flex: 0 0 40px;
    }
  }
}
</style>
