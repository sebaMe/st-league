import Vue from "vue";
import Router from "vue-router";
import Login from "../views/Login";
import Home from "../views/Home";
import User from "../views/User";
import { icons } from "../statics/icons";

Vue.use(Router);

export const ROUTES = {
  HOME: {
    path: "/home",
    name: "st league",
    icon: icons.MAIN,
    component: Home
  },
  USER: {
    path: "/user",
    name: "user",
    icon: icons.USER,
    component: User
  }
};

export const INTERNAL_ROUTES = {
  LOGIN: {
    path: "/login",
    name: "login",
    component: Login
  },
  NO_PATH: {
    path: "*",
    redirect: ROUTES.HOME.path
  }
};

export const router = new Router({
  routes: [...Object.values(ROUTES), ...Object.values(INTERNAL_ROUTES)]
});
