<template>
  <vuc-frame class="view__login">
    <template slot="header">
      <v-icon color="primary" left>{{$options.icons.MAIN}}</v-icon>
      <span class="view-title">ST League</span>
      <v-icon color="primary" right>{{$options.icons.MAIN}}</v-icon>
    </template>

    <vuc-card
      class="sign-in-form"
      top-msg="Sign in, Maggot!"
      bottom-msg="Welcooome to the DANGER-Zone!"
      banner-url="https://media.giphy.com/media/ueISkGMBeb5kI/giphy.gif"
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
      <v-btn
        slot="footer"
        :disabled="!valid || loading"
        :loading="loading"
        @click="submit"
        color="primary"
      >
        <v-icon left>{{$options.icons.HOT}}</v-icon>Enter
        <v-icon right>{{$options.icons.HOT}}</v-icon>
      </v-btn>
    </vuc-card>
  </vuc-frame>
</template>

<script>
import { mapActions } from "vuex";
import { notifyError } from "../plugins/vue.notifications";
import { authWithFB } from "../firebase/auth";

import VucFrame from "../components/VucFrame";
import VucCard from "../components/VucCard";

export default {
  name: "Login",
  components: {
    VucFrame,
    VucCard
  },
  data() {
    return {
      valid: true,
      show: false,
      login: "",
      pw: "",
      loading: false,
      loginRules: [
        v => (typeof v === "string" && v.length === 10) || "is required"
      ],
      pwRules: [v => !!v || "is required"]
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
  }
}
</style>
