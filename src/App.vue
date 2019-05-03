<template>
  <div id="app">
    <v-app>
      <v-navigation-drawer v-if="user.uid !== undefined" v-model="drawer" app>
        <v-list>
          <v-list-tile v-for="item in navItems" :key="item.path" :to="item.path" ripple>
            <v-list-tile-action>
              <v-icon>{{item.icon}}</v-icon>
            </v-list-tile-action>
            <v-list-tile-title>{{item.name}}</v-list-tile-title>
          </v-list-tile>
        </v-list>
      </v-navigation-drawer>

      <v-toolbar v-if="user.uid !== undefined" color="primary" dark fixed app dense>
        <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
        <v-toolbar-title>
          <v-btn flat :to="navHome.path">
            <v-icon left>{{navHome.icon}}</v-icon>
            <span class="home-title">{{navHome.name}}</span>
            <v-icon right>{{navHome.icon}}</v-icon>
          </v-btn>
        </v-toolbar-title>
        <v-spacer></v-spacer>
        <v-toolbar-items class="hidden-sm-and-down">
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
import { ROUTES } from "./router/router";

export default {
  data() {
    return {
      drawer: false
    };
  },
  computed: {
    ...mapGetters(["user"]),
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
          name: this.user.name || ROUTES.USER.name,
          path: ROUTES.USER.path,
          icon: ROUTES.USER.icon
        }
      ];
    }
  },
  methods: {
    ...mapActions(["signOut"])
  }
};
</script>

<style lang="scss">
#app {
  @include animation-fade-slide-top;
  .home-title {
    @include font-bangers;
    font-size: 2em;
  }
}
</style>
