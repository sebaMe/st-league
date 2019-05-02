<template>
  <div id="app">
    <v-app>
      <v-navigation-drawer v-if="user.uid !== undefined" v-model="drawer" dense fixed app>
        <v-list dense>
          <v-list-tile @click>
            <v-list-tile-action>
              <v-icon>home</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>Home</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
          <v-list-tile @click>
            <v-list-tile-action>
              <v-icon>contact_mail</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>Contact</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </v-list>
      </v-navigation-drawer>

      <v-toolbar v-if="user.uid !== undefined" color="primary" dark fixed app dense>
        <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
        <v-toolbar-title>
          <v-btn flat :to="toHome">
            <v-icon left>stars</v-icon>
            <span class="title">ST League</span>
            <v-icon right>stars</v-icon>
          </v-btn>
        </v-toolbar-title>
        <v-spacer></v-spacer>
        <v-toolbar-items class="hidden-sm-and-down">
          <v-btn flat :to="toUser">
            <v-icon left>account_circle</v-icon>
            {{user.name}}
          </v-btn>
          <v-btn flat @click="signOut">
            <v-icon left>exit_to_app</v-icon>Sign Out
          </v-btn>
        </v-toolbar-items>
      </v-toolbar>

      <v-content>
        <transition name="fade-slide-top">
          <router-view></router-view>
        </transition>
      </v-content>
    </v-app>

    <notifications group="general" position="bottom center"/>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { ROUTES } from "./router/router";

export default {
  data() {
    return {
      drawer: false
    };
  },
  computed: {
    ...mapGetters(["user"]),
    toHome() {
      return ROUTES.HOME.path;
    },
    toUser() {
      return ROUTES.USER.path;
    }
  },
  methods: {
    ...mapActions(["signOut"])
  }
};
</script>

<style lang="scss">
@include animation-fade-slide-top;
</style>
