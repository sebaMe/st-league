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
  },
  data() {
    return {
      unsubSeason: undefined
    };
  },
  mounted() {
    this.fetchUsers();
    this.fetchDurac().then(() => {
      this.subscribeDuracSeason().then(unsub => {
        this.unsubSeason = unsub;
      });
    });
  },
  beforeDestroy() {
    if (typeof this.unsubSeason === "function") this.unsubSeason();
  },
  methods: mapActions(["fetchUsers", "fetchDurac", "subscribeDuracSeason"])
};
</script>

<style lang="scss">
.view__home {
}
</style>
