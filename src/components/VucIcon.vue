<template>
  <i v-if="this.$slots.default" :class="classes">
    <slot></slot>
  </i>
</template>

<script>
export default {
  name: "VucIcon",
  props: {
    color: {
      type: String,
      default: ""
    }
  },
  computed: {
    classes() {
      return [
        "component__vuc-icon material-icons",
        { "x--primary": this.color === "primary" },
        { "x--secondary": this.color === "secondary" }
      ];
    }
  }
};
</script>

<style lang="scss">
.component__vuc-icon {
  margin-right: 10px;
  align-self: center;
  font-size: inherit;

  &.x--primary {
    color: $color-prim;
  }

  &.x--secondary {
    color: $color-sec;
  }
}
</style>
