<template>
  <div id="app">
    <v-app>
      <v-navigation-drawer v-if="userId !== undefined" v-model="drawer" app>
        <v-list>
          <v-list-tile v-for="item in navItems" :key="item.path" :to="item.path" ripple>
            <v-list-tile-action>
              <v-icon>{{item.icon}}</v-icon>
            </v-list-tile-action>
            <v-list-tile-title>{{item.name}}</v-list-tile-title>
          </v-list-tile>
          <v-list-tile @click="signOut" ripple>
            <v-list-tile-action>
              <v-icon>{{$options.icons.LOGOUT}}</v-icon>
            </v-list-tile-action>
            <v-list-tile-title>Sign Out</v-list-tile-title>
          </v-list-tile>
        </v-list>
      </v-navigation-drawer>

      <v-toolbar v-if="userId !== undefined" color="primary" dark fixed app dense>
        <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
        <v-btn class="home-button" flat :to="navHome.path">
          <v-icon left>{{navHome.icon}}</v-icon>
          <span class="home-title">{{navHome.name}}</span>
          <v-icon right>{{navHome.icon}}</v-icon>
        </v-btn>
        <v-spacer></v-spacer>
        <v-toolbar-items class="toolbar-menu hidden-sm-and-down">
          <v-btn v-for="item in navItems" :key="item.path" flat :to="item.path">
            <v-icon left>{{item.icon}}</v-icon>
            {{item.name}}
          </v-btn>
          <v-btn flat @click="signOut">
            <v-icon left>{{$options.icons.LOGOUT}}</v-icon>Sign Out
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
import { signOutWithFB } from "./firebase/auth";
import { ROUTES } from "./router/router";

export default {
  data() {
    return {
      drawer: false
    };
  },
  computed: {
    ...mapGetters(["userId", "userName"]),
    navHome() {
      return {
        name: ROUTES.HOME.name,
        path: ROUTES.HOME.path,
        icon: ROUTES.HOME.icon
      };
    },
    navItems() {
      return [
        {
          name: this.userName || ROUTES.USER.name,
          path: ROUTES.USER.path,
          icon: ROUTES.USER.icon
        }
      ];
    }
  },
  methods: {
    signOut() {
      signOutWithFB();
    }
  }
};
</script>

<style lang="scss">
#app {
  @include animation-fade-slide-top;
  ul {
    list-style-type: none;
    padding: 0;
  }
  div,
  button,
  li,
  span,
  td,
  th {
    user-select: none;
  }
  .home-title {
    @include font-bangers;
    font-size: 2em;
  }
}
</style>
