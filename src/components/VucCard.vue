<template>
  <div v-if="loading" class="component__vuc-card">
    <v-progress-linear v-if="loading" color="secondary" :indeterminate="true"></v-progress-linear>
  </div>
  <div v-else class="component__vuc-card">
    <div v-if="bannerUrl.length > 0" class="vuc-card_banner" :style="bannerStyle">
      <div v-if="topMsg.length > 0" class="top-left">{{topMsg}}</div>
      <div v-if="bottomMsg.length > 0" class="bottom-right">{{bottomMsg}}</div>
    </div>
    <header v-if="$slots.header !== undefined" class="vuc-card_header">
      <slot name="header"></slot>
    </header>
    <div v-if="$slots.default !== undefined" class="vuc-card_content">
      <slot></slot>
    </div>
    <footer v-if="$slots.footer !== undefined" class="vuc-card_footer">
      <slot name="footer"></slot>
    </footer>
  </div>
</template>

<script>
export default {
  name: "VucCard",
  props: {
    bannerUrl: {
      type: String,
      default: ""
    },
    topMsg: {
      type: String,
      default: ""
    },
    bottomMsg: {
      type: String,
      default: ""
    },
    loading: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    bannerStyle() {
      return { backgroundImage: `url(${this.bannerUrl})` };
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
  max-width: 600px;
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

  .vuc-card_banner {
    position: relative;
    flex: 0 0 100px;
    background-size: cover;
    background-position: center;
    border-bottom: 1px solid #000;
    .top-left {
      position: absolute;
      top: -1px;
      left: -4px;
    }
    .bottom-right {
      position: absolute;
      right: -4px;
      bottom: -1px;
    }
  }

  .vuc-card_header {
    @include font-bangers;
    display: flex;
    flex: 0 0 30px;
    margin-top: 5px;
    padding: 0 5px;
    font-size: 20px;
    align-items: center;
    justify-content: center;
    color: $color-sec;
  }
  .vuc-card_content {
    flex: 1;
    padding: 0 5px;
    margin-bottom: 10px;
  }
  .vuc-card_footer {
    display: flex;
    margin-top: 5px;
    justify-content: center;
    margin-bottom: 10px;
  }
}
</style>
