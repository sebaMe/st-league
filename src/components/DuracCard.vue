<template>
  <vuc-card
    class="durac-card"
    top-msg="brace yourselfs..."
    bottom-msg="...lunch is coming!"
    :banner-url="bannerUrl"
    :loading="loadingDurac"
  >
    <template slot="header">
      <div class="durac-title">
        <vuc-icon color="primary">{{$icons.DURAC}}</vuc-icon>
        <span>{{durac.name}}</span>
      </div>
      <div class="season-info">{{`${duracSeason.name} - ${seasonDay}`}}</div>
      <div class="days-left">
        <span class="label">Days left</span>
        <span class="days">{{daysLeft}}</span>
      </div>
    </template>

    <div class="durac-menu">
      <add-players :userList="userList" :playerList="playerList"></add-players>
      <durac-match :disabled="!allowNewMatch" :playerList="playerList" :matchList="matchList"></durac-match>
      <durac-ranking></durac-ranking>
    </div>

    <ul class="match-list">
      <li v-for="(ts, index) in matchList" :key="ts" class="match-item">
        <vuc-btn class="match-button" @click="selectMatch(ts)">
          <span class="match-number">{{getMatchNumber(index)}}</span>
          <span class="match-date">{{ts | fullDate}}</span>
          <vuc-icon>{{isSelectedMatch(ts) ? $icons.COMPRESS : $icons.EXPAND}}</vuc-icon>
        </vuc-btn>
        <transition name="fade-slide-bottom">
          <durac-result v-if="isSelectedMatch(ts)" :matchId="ts" :playerList="playerList"></durac-result>
        </transition>
      </li>
    </ul>
  </vuc-card>
</template>

<script>
import _get from "lodash.get";
import _orderBy from "lodash.orderby";
import { mapActions, mapGetters } from "vuex";

import VucCard from "../components/VucCard";
import VucOverlay from "../components/VucOverlay";
import VucBtn from "../components/VucBtn";
import VucIcon from "../components/VucIcon";
import DuracMatch from "../components/DuracMatch";
import AddPlayers from "../components/AddPlayers";
import DuracResult from "../components/DuracResult";
import DuracRanking from "../components/DuracRanking";

import { daysBetween } from "../utils/date";
import { cloneObject } from "../utils/commons";

export default {
  name: "DuracCard",
  components: {
    VucCard,
    VucOverlay,
    VucBtn,
    VucIcon,
    DuracMatch,
    AddPlayers,
    DuracResult,
    DuracRanking
  },
  data() {
    return {
      selectedMatchId: undefined
    };
  },
  methods: {
    getMatchNumber(index) {
      const num = this.matchList.length - index;
      return num < 10 ? "0" + num : num;
    },
    selectMatch(matchId) {
      if (this.isSelectedMatch(matchId)) {
        this.selectedMatchId = undefined;
      } else {
        this.selectedMatchId = matchId;
      }
    },
    isSelectedMatch(matchId) {
      return this.selectedMatchId === matchId;
    }
  },
  computed: {
    ...mapGetters(["users", "durac", "duracSeason"]),
    loadingDurac() {
      return _get(this.duracSeason, "id") === undefined;
    },
    bannerUrl() {
      return _get(this.duracSeason, "bannerUrl", "");
    },
    allowNewMatch() {
      return this.daysLeft > 0 && this.matchList.length <= 100;
    },
    userList() {
      const users = this.users || {};
      const players = _get(this.duracSeason, "players", {});

      const filteredUsers = Object.values(this.users).filter(user => {
        return _get(players, user.id) === undefined;
      });
      return _orderBy(filteredUsers, "name", "asc");
    },
    playerList() {
      const players = _get(this.duracSeason, "players", {});
      const mappedPlayers = Object.values(players).map(({ id }) => {
        return { id, name: _get(this.users, `${id}.name`) };
      });
      return _orderBy(mappedPlayers, "name", "asc");
    },
    seasonDay() {
      const { start, end } = this.duracSeason;

      const seasonDays = daysBetween(start, end);
      const daysPlayed = daysBetween(start, new Date());
      return `Day ${daysPlayed} of ${seasonDays}`;
    },
    daysLeft() {
      const daysLeft = daysBetween(new Date(), this.duracSeason.end);
      return daysLeft + 1;
    },
    matchList() {
      return cloneObject(_get(this.duracSeason, "matches", [])).reverse();
    }
  }
};
</script>

<style lang="scss">
.durac-card {
  margin: auto;

  .vuc-card_header {
    display: block;
    .durac-title {
      display: flex;
      justify-content: center;
      font-size: 25px;
    }
  }

  .season-info {
    font-size: 18px;
    text-align: center;
    color: $color-prim;
  }
  .days-left {
    @include font-bangers;
    flex: 1;
    text-align: center;
    .days {
      margin-left: 10px;
      font-size: 25px;
      color: $color-prim;
    }
  }

  .durac-menu {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-evenly;
  }
  .match-item {
    margin-top: 10px;
    &:not(:last-child) {
      border-bottom: 2px solid $color-prim;
    }
  }
  .match-button {
    width: 100%;
    border: none;
    border-radius: 0;
    margin: 0;
    box-shadow: none;
    .match-number {
      margin-right: 10px;
      color: $color-prim;
    }
    .match-date {
      flex: 1;
    }
    i {
      color: $color-prim;
      font-size: 30px;
    }
  }
}
</style>
