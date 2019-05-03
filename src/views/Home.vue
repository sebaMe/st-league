<template>
  <vuc-frame class="view__home">
    <span slot="header" class="view-title">ST League</span>
    <durac-card></durac-card>
  </vuc-frame>
</template>

<script>
import { mapActions } from "vuex";
import VucFrame from "../components/VucFrame";
import DuracCard from "../components/DuracCard";

export default {
  name: "Home",
  components: {
    VucFrame,
    DuracCard
  }
};
</script>

<style lang="scss">
.view__home {
}
</style>
