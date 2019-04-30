<template>
  <div class="component__vuc-frame">
    <header class="vuc-frame_header">
      <slot name="header"></slot>
    </header>
    <div class="vuc-frame_content">
      <slot></slot>
    </div>
    <footer class="vuc-frame_footer">
      <slot name="footer"></slot>
    </footer>
  </div>
</template>

<script>
export default {
  name: "Frame",
  props: {
    topMsg: {
      type: String,
      default: ""
    },
    bottomMsg: {
      type: String,
      default: ""
    }
  }
};
</script>

<style lang="scss">
.component__vuc-frame {}
</style>
