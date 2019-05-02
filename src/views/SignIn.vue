<template>
  <vuc-frame class="view__sign-in">
    <template slot="header">
      <v-icon color="primary" left>stars</v-icon>
      <span class="view-title">Sign in</span>
      <v-icon color="primary" right>stars</v-icon>
    </template>
    <sign-in-form></sign-in-form>
  </vuc-frame>
</template>

<script>
import VucFrame from "../components/VucFrame";
import SignInForm from "../components/SignInForm";

export default {
  name: "SignIn",
  components: {
    VucFrame,
    SignInForm
  }
};
</script>

<style lang="scss">
.view__sign-in {
}
</style>
