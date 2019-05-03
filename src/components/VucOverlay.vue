<template>
  <v-dialog class="component__vuc-overlay" :disabled="disabled" v-model="dialog" max-width="400" lazy>
    <slot name="activator" slot="activator" :disabled="disabled"></slot>
    <slot></slot>
  </v-dialog>
</template>

<script>
export default {
  name: "VucOverlay",
  props: {
    disabled: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      dialog: false,
    };
  }
};
</script>

<style lang="scss">
.component__vuc-overlay {}
</style>