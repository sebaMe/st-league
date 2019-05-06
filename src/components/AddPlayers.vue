<template>
  <v-dialog v-model="dialog" max-width="400" lazy>
    <vuc-btn slot="activator" :icon="$options.icons.PLAYERS">{{`Players (${playersAmount})`}}</vuc-btn>

    <vuc-card class="add-players">
      <template slot="header">Add new players!</template>
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
  </v-dialog>
</template>

<script>
import _get from "lodash.get";
import { mapActions, mapGetters } from "vuex";

import VucCard from "../components/VucCard";
import VucBtn from "../components/VucBtn";

export default {
  name: "AddPlayers",
  components: {
    VucCard,
    VucBtn
  },
  props: {
    userList: {
      type: Array,
      default: []
    },
    playerList: {
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
    ...mapActions(["recruitDuracPlayer"])
  },
  computed: {
    usersAmount() {
      return this.userList.length;
    },
    playersAmount() {
      return this.playerList.length;
    }
  }
};
</script>

<style lang="scss">
.add-players {
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
