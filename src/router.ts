import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";

import BattlesPage from "./pages/BattlesPage.vue";
import HomePage from "./pages/HomePage.vue";
import LeaderboardPage from "./pages/LeaderboardPage.vue";
import LoginPage from "./pages/LoginPage.vue";
import PlayersPage from "./pages/PlayersPage.vue";
import { useAuthStore } from "./stores/auth.store";

export const loginRoute: RouteRecordRaw = {
  path: "/login",
  component: LoginPage,
  meta: {
    requiresAuth: false
  }
};

export const playersRoute: RouteRecordRaw = {
  path: "/players",
  component: PlayersPage,
  meta: {
    requiresAuth: true
  }
};

export const battlesRoute: RouteRecordRaw = {
  path: "/battles",
  component: BattlesPage,
  meta: {
    requiresAuth: true
  }
};

export const leaderboardRoute: RouteRecordRaw = {
  path: "/leaderboard",
  component: LeaderboardPage,
  meta: {
    requiresAuth: true
  }
};

export const homeRoute: RouteRecordRaw = {
  path: "/",
  component: HomePage,
  meta: {
    requiresAuth: true
  },
  redirect: leaderboardRoute,
  children: [playersRoute, battlesRoute, leaderboardRoute]
};

const routes: RouteRecordRaw[] = [homeRoute, loginRoute];

export const router = createRouter({
  history: createWebHashHistory(),
  routes
});

router.beforeEach(async (to) => {
  const authStore = useAuthStore();

  if (to.meta.requiresAuth && !authStore.user) {
    const isAuthenticated = await authStore.checkAuthState();

    return isAuthenticated ? to : loginRoute.path;
  }

  if (!to.meta.requiresAuth && to.path !== loginRoute.path) {
    return to;
  }

  if (to.path === loginRoute.path && authStore.user) {
    return homeRoute.path;
  }
});
