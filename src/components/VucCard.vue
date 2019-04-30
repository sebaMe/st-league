<template>
  <div class="component__vuc-card">
    <header class="vuc-card_header">
      <slot name="header"></slot>
    </header>
    <div class="vuc-card_content">
      <slot></slot>
    </div>
    <footer class="vuc-card_footer">
      <slot name="footer"></slot>
    </footer>
  </div>
</template>

<script>
export default {
  name: "Card"
};
</script>

<style lang="scss">
.component__vuc-card {
  @include card-shadow-low;

  position: relative;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  background-color: #fff;
  .vuc-card_header {
    flex: 0 0 30px;
  }
  .vuc-card_content {
    flex: 1;
    overflow: auto;
  }
}
</style>
