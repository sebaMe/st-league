<template>
  <vuc-frame class="view__login">
    <template slot="header">
      <v-icon color="primary" left>{{$icons.MAIN}}</v-icon>
      <span class="view-title">ST League</span>
      <v-icon color="primary" right>{{$icons.MAIN}}</v-icon>
    </template>

    <vuc-card
      class="sign-in-form"
      top-msg="Sign in, Maggot!"
      bottom-msg="Welcome to the DANGER-Zone..."
      banner-url="https://firebasestorage.googleapis.com/v0/b/st-league-x.appspot.com/o/banners%2Flogin.gif?alt=media&token=b3966378-48a1-48ff-aec1-f78f6b0ea7af"
    >
      <template slot="header">Sign In</template>
      <v-form ref="form" v-model="valid" lazy-validation>
        <v-text-field
          v-model="login"
          :rules="loginRules"
          counter="10"
          label="login"
          clearable
          required
        ></v-text-field>
        <v-text-field
          v-model="pw"
          :rules="pwRules"
          label="password"
          :type="show ? 'text' : 'password'"
          :append-icon="show ? 'visibility_off' : 'visibility'"
          @click:append="show = !show"
          clearable
          required
        ></v-text-field>
      </v-form>
      <vuc-btn
        slot="footer"
        :icon="$icons.HOT"
        @click="submit"
        :disabled="!valid || loading"
        :loading="loading"
      >Enter</vuc-btn>
    </vuc-card>
  </vuc-frame>
</template>

<script>
import { mapActions } from "vuex";
import { notifyError } from "../plugins/vue.notifications";
import { authWithFB } from "../firebase/auth";

import VucFrame from "../components/VucFrame";
import VucCard from "../components/VucCard";
import VucBtn from "../components/VucBtn";

export default {
  name: "Login",
  components: {
    VucFrame,
    VucCard,
    VucBtn
  },
  data() {
    return {
      valid: true,
      show: false,
      login: "",
      pw: "",
      loading: false,
      loginLength: 10,
      loginRules: [
        v => (typeof v === "string" && v.length === this.loginLength) || `${this.loginLength} characters ... no more, no less!`
      ],
      pwRules: [v => !!v || "no password ... no competition!"]
    };
  },
  methods: {
    submit() {
      if (this.$refs.form.validate()) {
        this.loading = true;
        authWithFB(this.login, this.pw)
          .then(() => {
            this.loading = false;
            this.$router.push("home");
          })
          .catch(({ message }) => {
            notifyError(message);
            this.loading = false;
          });
      }
    }
  }
};
</script>

<style lang="scss">
.view__login {
  .sign-in-form {
    margin: auto;
    .vuc-card_banner {
      flex: 0 0 200px;
    }
  }
}
</style>
