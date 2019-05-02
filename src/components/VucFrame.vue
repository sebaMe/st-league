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
.component__vuc-frame {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  padding: 10px;
  .vuc-frame_header {
    display: flex;
    flex: 0 0 30px;
    align-items: center;
    justify-content: center;
    font-size: 25px;
    .view-title {
      @include font-bangers;
      display: flex;
      color: $color-sec;
    }
  }
  .vuc-frame_content {
    margin-top: 10px;
    flex: 1;
  }
}
</style>
