<template>
  <vuc-card
    class="durac-card"
    top-msg="prepare yourselfs..."
    bottom-msg="...lunch is coming!"
    :loading="loadingDurac"
  >
    <template slot="header">
      <v-icon color="primary" left>{{$options.icons.DURAC}}</v-icon>
      <span class="durac-title">{{durac.name}}</span>

      <vuc-overlay>
        <v-btn slot="activator" flat class="contenders" color="primary">
          <v-icon left>{{$options.icons.PLAYERS}}</v-icon>
          {{`Players (${playersAmount})`}}
        </v-btn>
        <vuc-card class="player-recruiter" bottom-msg="mhmmm fresh meat...">
          <template slot="header">Recruit new players!</template>
          <div class="label">{{`Players (${playersAmount})`}}</div>
          <div class="player-list">
            <div v-for="player in players" :key="player.id" class="player">{{player.name}}</div>
          </div>
          <div class="label">{{`Scaredy Cats (${usersAmount})`}}</div>
          <div class="user-list">
            <v-btn
              v-for="user in usersList"
              :key="user.id"
              class="user"
              @click="recruitPlayer(user.id)"
              flat
            >{{user.name}}</v-btn>
          </div>
        </vuc-card>
      </vuc-overlay>
    </template>

    <div class="current-season">
      <div class="season-info">
        <div class="season-name">{{duracSeason.name}}</div>
        <div class="match-day">{{matchDay}}</div>
      </div>
      <div class="days-left">
        <span class="label">Days left ...</span>
        <span class="days">{{daysLeft}}</span>
      </div>
    </div>
  </vuc-card>
</template>

<script>
import _get from "lodash.get";
import _orderBy from "lodash.orderby";
import { mapActions, mapGetters } from "vuex";

import VucCard from "../components/VucCard";
import VucOverlay from "../components/VucOverlay";

import { daysBetween } from "../utils/date";

export default {
  name: "DuracCard",
  components: {
    VucCard,
    VucOverlay
  },
  methods: {
    ...mapActions(["recruitDuracPlayer"]),
    recruitPlayer(userId) {
      this.recruitDuracPlayer({
        seasonId: this.duracSeason.id,
        playerId: userId
      });
    }
  },
  computed: {
    ...mapGetters(["users", "durac", "duracSeason"]),
    loadingDurac() {
      return _get(this.duracSeason, "id") === undefined;
    },
    usersList() {
      const users = this.users || {};
      const players = _get(this.duracSeason, "players", {});

      const filteredUsers = Object.values(this.users).filter(user => {
        return _get(players, user.id) === undefined;
      });
      return _orderBy(filteredUsers, "name", "asc");
    },
    usersAmount() {
      return this.usersList.length;
    },
    players() {
      const players = _get(this.duracSeason, "players", {});
      const mappedPlayers = Object.values(players).map(({ id }) => {
        return { id, name: _get(this.users, `${id}.name`) };
      });
      return _orderBy(mappedPlayers, "name", "asc");
    },
    playersAmount() {
      return this.players.length;
    },
    matchDay() {
      const seasonDays = daysBetween(
        this.duracSeason.start,
        this.duracSeason.end
      );
      const daysPlayed = daysBetween(this.duracSeason.start, new Date());
      return `Matchday ${daysPlayed} of ${seasonDays}`;
    },
    daysLeft() {
      const daysLeft = daysBetween(new Date(), this.duracSeason.end);
      return daysLeft;
    }
  }
};
</script>

<style lang="scss">
.durac-card {
  width: 400px;
  margin: auto;
  .durac-title {
    flex: 1;
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
}
.player-recruiter {
  .label {
    text-align: center;
  }
  .player-list,
  .user-list {
    display: flex;
    justify-content: center;
  }

  .player,
  .user {
    @include font-bangers;
    @include border-comic;
    flex: 0 0 auto;
    padding: 3px;
    margin: 3px 3px 0 0;
  }

  .player {
    color: $color-sec;
    border-color: $color-prim;
  }
}
</style>
