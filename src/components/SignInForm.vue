<template>
  <vuc-card
    class="sign-in-form"
    top-msg="Sign in, Maggot!"
    bottom-msg="Welcooome to the DANGER-Zone!"
  >
    <template slot="header">
      ST League
    </template>
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
    >Enter</v-btn>
  </vuc-card>
</template>

<script>
import { notifyError } from "../plugins/vue.notifications";

import VucCard from "./VucCard";
import { mapActions } from "vuex";

export default {
  name: "SignInForm",
  components: {
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
    ...mapActions(["signIn"]),
    submit() {
      if (this.$refs.form.validate()) {
        this.loading = true;
        this.signIn({ login: this.login, pw: this.pw })
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
.sign-in-form {
  margin: auto;
  max-width: 400px;
}
</style>
