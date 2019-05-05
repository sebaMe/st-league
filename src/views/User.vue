<template>
  <vuc-frame class="view__user">
    <template slot="header">
      <span class="view-title">Your Profile</span>
    </template>
    <vuc-card class="user-form" bottom-msg="This profile is a disgrace!">
      <v-form ref="form" v-model="valid" lazy-validation>
        <v-text-field v-model="name" :rules="nameRules" counter="20" label="name" clearable></v-text-field>
      </v-form>
      <vuc-btn slot="footer" @click="submit" :disabled="!valid || loading" :loading="loading">Submit</vuc-btn>
    </vuc-card>
  </vuc-frame>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

import VucFrame from "../components/VucFrame";
import VucCard from "../components/VucCard";
import VucBtn from "../components/VucBtn";

import { notifyError, notifyGeneral } from "../plugins/vue.notifications";

export default {
  name: "User",
  components: {
    VucFrame,
    VucCard,
    VucBtn
  },
  data() {
    return {
      valid: true,
      name: "",
      loading: false,
      nameRules: [
        v =>
          (typeof v === "string" && v.length >= 3 && v.length <= 10) ||
          "name doesnt match criteria"
      ]
    };
  },
  watch: {
    userName: {
      handler(val) {
        this.name = val || "";
      },
      immediate: true
    }
  },
  computed: mapGetters(["userName"]),
  methods: {
    ...mapActions(["updateUser"]),
    submit() {
      if (this.$refs.form.validate()) {
        this.loading = true;
        this.updateUser({ name: this.name })
          .then(() => {
            this.loading = false;
            notifyGeneral(`${this.name}..., what fuckin' stu... nning name!`);
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
.view__user {
  .user-form {
    margin: auto;
    max-width: 400px;
  }
}
</style>
