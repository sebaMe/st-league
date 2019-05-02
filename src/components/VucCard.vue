<template>
  <div class="component__vuc-card">
    <div v-if="topMsg.length > 0" class="top-left">{{topMsg}}</div>
    <header v-if="$slots.header !== undefined" class="vuc-card_header">
      <slot name="header"></slot>
    </header>
    <div v-if="$slots.default !== undefined" class="vuc-card_content">
      <slot></slot>
    </div>
    <footer v-if="$slots.footer !== undefined" class="vuc-card_footer">
      <slot name="footer"></slot>
    </footer>
    <div v-if="bottomMsg.length > 0" class="bottom-right">{{bottomMsg}}</div>
  </div>
</template>

<script>
export default {
  name: "VucCard",
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
.component__vuc-card {
  @include card-shadow-low;

  position: relative;
  display: flex;
  flex-direction: column;
  padding: 20px 10px;
  overflow: hidden;
  background-color: #fff;

  .top-left,
  .bottom-right {
    padding: 0 10px;
    background-color: #fff;
    border: 1px solid #000;
    transform: skew(-15deg);
    font-size: 12px;
  }
  .top-left {
    left: -6px;
    position: absolute;
    top: -2px;
  }
  .bottom-right {
    right: -6px;
    position: absolute;
    bottom: -2px;
  }

  .vuc-card_header {
    @include font-bangers;
    display: flex;
    flex: 0 0 30px;
    font-size: 20px;
    justify-content: center;
    color: $color-sec;
  }
  .vuc-card_content {
    flex: 1;
    overflow: auto;
  }
  .vuc-card_footer {
    display: flex;
    justify-content: center;
  }
}
</style>
