<template>
  <div class="view__sign-in">
    <vuc-frame>
      <vuc-card class="sign-in-form">
        <template slot="header">Sign in Boi!</template>
        <input type="text" placeholder="Login">
        <input type="text" placeholder="Password">
      </vuc-card>
    </vuc-frame>
  </div>
</template>

<script>
import VucFrame from "../components/VucFrame";
import VucCard from "../components/VucCard";

export default {
  name: "SignIn",
  components: {
    VucFrame,
    VucCard
  }
};
</script>

<style lang="scss">
.view__sign-in {
  .sign-in-form {
    position: relative;
    margin: auto;
    width: 300px;
    height: 200px;
  }
}
</style>
