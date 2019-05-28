<template>
  <vuc-btn>
    <a ref="backupLink"></a>
  </vuc-btn>
</template>

<script>
import { createBackupJson } from "../firebase/backup";

import VucBtn from "./VucBtn";
import { getFullDate } from '../utils/date';

export default {
  name: "DownloadBackup",
  components: {
    VucBtn
  },
  mounted() {
    const linkEl = this.$refs.backupLink;
    createBackupJson().then(url => {
      linkEl.download = `backup_${new Date().toLocaleDateString().replace(/\./g, "_")}.json`;
      linkEl.href = url;
      linkEl.textContent = "download backup";
    });
  }
};
</script>

<style lang="scss">
</style>
