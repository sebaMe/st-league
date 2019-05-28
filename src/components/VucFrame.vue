<template>
  <div class="component__vuc-frame">
    <header v-if="$slots.header !== undefined" class="vuc-frame_header">
      <slot name="header"></slot>
    </header>
    <div v-if="$slots.default !== undefined" class="vuc-frame_content">
      <slot></slot>
    </div>
    <footer v-if="$slots.footer !== undefined" class="vuc-frame_footer">
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
  @include animation-fade-slide-top;
  position: relativ;
  width: 100%;
  height: 100%;
  padding: 20px 10px;
  .vuc-frame_header {
    display: flex;
    align-items: center;
    justify-content: center;
    padding-bottom: 10px;
    font-size: 25px;
    .view-title {
      @include font-bangers;
      display: flex;
      color: $color-sec;
    }
  }
  .vuc-frame_content {
    padding-bottom: 10px;
    flex: 1;
  }
}
</style>
