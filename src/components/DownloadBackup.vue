<template>
  <vuc-btn @click="setBackupLink">
    <a ref="backupLink">Export Data-base as JSON</a>
  </vuc-btn>
</template>

<script>
import { mapActions } from "vuex";

import VucBtn from "./VucBtn";
import { getFullDate } from "../utils/date";

export default {
  name: "DownloadBackup",
  components: {
    VucBtn
  },
  data() {
    return {

    }
  },
  methods: {
    ...mapActions(["createBackupJson"]),
    setBackupLink() {
      const linkEl = this.$refs.backupLink;
      this.createBackupJson().then(url => {
        linkEl.download = `backup_${new Date()
          .toLocaleDateString()
          .replace(/\./g, "_")}.json`;
        linkEl.href = url;
      });
    }
  }
};
</script>

<style lang="scss">
</style>
