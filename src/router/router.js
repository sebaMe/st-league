import Vue from "vue";
import Router from "vue-router";
import SignIn from "../views/SignIn";
import Home from "../views/Home";
import User from "../views/User";

Vue.use(Router);

export const ROUTES = {
  SIGN_IN: {
    path: "/",
    name: "signIn",
    component: SignIn
  },
  HOME: {
    path: "/home",
    name: "home",
    component: Home
  },
  USER: {
    path: "/user",
    name: "user",
    component: User
  }
};

export const router = new Router({
  routes: Object.values(ROUTES)
});
