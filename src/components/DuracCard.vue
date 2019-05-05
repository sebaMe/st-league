<template>
  <vuc-card
    class="durac-card"
    top-msg="prepare yourselfs..."
    bottom-msg="...lunch is coming!"
    :banner-url="bannerUrl"
    :loading="loadingDurac"
  >
    <template slot="header">
      <vuc-icon color="primary">{{$options.icons.DURAC}}</vuc-icon>
      <span class="durac-title">{{durac.name}}</span>

      <vuc-overlay>
        <vuc-btn slot="activator" :icon="$options.icons.PLAYERS">{{`Players (${playersAmount})`}}</vuc-btn>
        <vuc-card class="player-recruiter">
          <template slot="header">Recruit new players!</template>
          <ul class="user-list">
            <li class="label">{{`Noobs (${usersAmount})`}}</li>
            <vuc-btn
              v-for="user in userList"
              :key="user.id"
              tag="li"
              class="user-item"
              @click="recruitDuracPlayer(user.id)"
            >{{user.name}}</vuc-btn>
          </ul>
          <ul class="player-list">
            <li class="label">{{`Players (${playersAmount})`}}</li>
            <li v-for="player in playerList" :key="player.id" class="player-item">{{player.name}}</li>
          </ul>
        </vuc-card>
      </vuc-overlay>
    </template>

    <section class="current-season">
      <div class="season-info">
        <div class="season-name">{{duracSeason.name}}</div>
        <div class="match-day">{{seasonDay}}</div>
      </div>
      <div class="days-left">
        <span class="label">Days left ...</span>
        <span class="days">{{daysLeft}}</span>
      </div>
    </section>

    <section class="match-history">
      <div class="match-menu">
        <durac-match :playerList="playerList" :matchList="matchList"></durac-match>
        <vuc-btn disabled :icon="$options.icons.MAIN">Rankings</vuc-btn>
      </div>
      <ul class="match-list">
        <vuc-btn v-for="(ts, index) in matchList" :key="ts" tag="li" class="match-item">
          <span class="match-number">{{getMatchNumber(index)}}</span>
          <span>{{ts | fullDate}}</span>
        </vuc-btn>
      </ul>
    </section>
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

import { daysBetween } from "../utils/date";

export default {
  name: "DuracCard",
  components: {
    VucCard,
    VucOverlay,
    VucBtn,
    VucIcon,
    DuracMatch
  },
  methods: {
    ...mapActions(["recruitDuracPlayer"]),
    getMatchNumber(index) {
      const num = this.matchList.length - index;
      return num < 10 ? "0" + num : num;
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
    userList() {
      const users = this.users || {};
      const players = _get(this.duracSeason, "players", {});

      const filteredUsers = Object.values(this.users).filter(user => {
        return _get(players, user.id) === undefined;
      });
      return _orderBy(filteredUsers, "name", "asc");
    },
    usersAmount() {
      return this.userList.length;
    },
    playerList() {
      const players = _get(this.duracSeason, "players", {});
      const mappedPlayers = Object.values(players).map(({ id }) => {
        return { id, name: _get(this.users, `${id}.name`) };
      });
      return _orderBy(mappedPlayers, "name", "asc");
    },
    playersAmount() {
      return this.playerList.length;
    },
    seasonDay() {
      const { start, end } = this.duracSeason;

      const seasonDays = daysBetween(start, end);
      const daysPlayed = daysBetween(start, new Date());
      return `Day of Season - ${daysPlayed} of ${seasonDays}`;
    },
    daysLeft() {
      const daysLeft = daysBetween(new Date(), this.duracSeason.end);
      return daysLeft + 1;
    },
    matchList() {
      return _get(this.duracSeason, "matches", [])
        .sort()
        .reverse();
    }
  }
};
</script>

<style lang="scss">
.durac-card {
  margin: auto;
  .durac-title {
    flex: 1;
    font-size: 20px;
  }
  .contenders {
    font-size: 18px;
  }
  .season-info {
    display: flex;
    font-size: 16px;
    text-align: center;
    color: $color-prim;

    .season-name,
    .match-day {
      flex: 1;
    }
  }
  .days-left {
    @include font-bangers;
    flex: 1;
    text-align: center;
    .days {
      font-size: 20px;
      color: $color-sec;
    }
  }

  .match-history {
    .match-menu {
      display: flex;
      justify-content: space-evenly;
    }
    .match-item {
      @include card-shadow-low;
      border: none;
      border-radius: 0;
      margin-bottom: 10px;
    }
    .match-number {
      margin-right: 10px;
      color: $color-prim;
    }
  }
}
.player-recruiter {
  .vuc-card_content {
    @include font-bangers;
    display: flex;
    justify-content: space-evenly;

    .label {
      text-align: center;
      color: $color-prim;
    }

    .user-list,
    .player-list {
      flex: 1;
    }

    .player-item {
      @include border-comic;
      margin: 5px;
      color: #fff;
      border-color: $color-prim;
      background-color: $color-prim;
      font-size: 18px;
      text-align: center;
    }
  }
}
</style>
