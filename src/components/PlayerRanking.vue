<template>
  <li :class="classes">
    <div class="player-info">
      <div class="name">{{playerName}}</div>
      <div class="games-won">
        <vuc-icon>{{$icons.MAIN}}</vuc-icon>
        {{player.winner}}
      </div>
      <div class="heart-container">
        <div class="lost-hearts">{{player.lostHearts}}</div>
        <vuc-icon
          v-for="(heart, index) in player.currentHearts"
          :key="index"
        >{{$icons.HEART}}</vuc-icon>
      </div>
    </div>
    <div class="player-score">
      <div v-for="(stroke, index) in player.strokes" :key="index" :class="strokeClass(index)"></div>
    </div>
  </li>
</template>

<script>
import _get from "lodash.get";
import { mapGetters } from "vuex";

import VucIcon from "../components/VucIcon";

export default {
  name: "PlayerRanking",
  components: {
    VucIcon
  },
  props: {
    player: Object
  },
  computed: {
    ...mapGetters(["users", "duracSeason"]),
    playerName() {
      return _get(this.users, `${this.player.id}.name`);
    },
    classes() {
      return ["component__player-ranking", { "x--durac": this.player.isDurac }];
    }
  },
  methods: {
    strokeClass(index) {
      return ["stroke", { "x--double": this.strokeIsDouble(index) }];
    },
    strokeIsDouble(index) {
      return this.player.double.indexOf(index) !== -1;
    }
  }
};
</script>

<style lang="scss">
.component__player-ranking {
  display: flex;
  margin-top: 5px;
  transition: 0.2s ease-in-out;
  font-size: 25px;
  color: $color-prim;

  &.x--durac {
    .name {
      color: $color-sec;
    }
  }

  .player-info {
    position: relative;
    display: flex;
    flex: 0 0 100px;
    align-items: center;
    justify-content: center;
    margin-right: 10px;
    font-size: 16px;
    .name {
      flex: 1;
      font-size: 25px;
    }
    .games-won {
      display: flex;
      color: $color-acc;
    }
    .heart-container {
      position: absolute;
      display: flex;
      height: 20px;
      width: 100%;
      top: -10px;
      justify-content: flex-start;
      color: $color-sec;
    }
  }
  .player-score {
    display: flex;
    align-items: center;
    flex: 1;
  }
  .stroke {
    @include card-shadow-low;
    display: inline-block;
    height: 30px;
    width: 5px;
    margin-left: 3px;
    background-color: $color-prim;

    &:nth-child(5n) {
      height: 37px;
      transform: rotate(-55deg);
      transform-origin: -8px 38px;
    }

    &.x--double {
      background-color: $color-acc;
    }
  }
}
</style>
