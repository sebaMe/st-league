<template>
  <component :is="tag" :class="classes" :disabled="disabled" @click="$emit('click')">
    <v-progress-circular
      class="vuc-btn_spinner"
      v-if="loading"
      color="secondary"
      :indeterminate="true"
    ></v-progress-circular>
    <div class="vuc-btn_content">
      <vuc-icon>{{icon}}</vuc-icon>
      <slot></slot>
    </div>
  </component>
</template>

<script>
import VucIcon from "./VucIcon";

export default {
  name: "VucBtn",
  components: {
    VucIcon
  },
  props: {
    tag: {
      type: String,
      default: "button"
    },
    icon: {
      type: String,
      default: ""
    },
    loading: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    classes() {
      return ["component__vuc-btn", { "x--loading": this.loading }];
    }
  }
};
</script>

<style lang="scss">
.component__vuc-btn {
  @include font-bangers;
  @include border-comic;

  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 3px;
  border-color: $color-prim;
  background-color: #fff;
  color: $color-sec;
  font-size: 20px;
  height: fit-content;
  outline: none;
  cursor: pointer;
  user-select: none;

  .vuc-btn_spinner {
    position: absolute;
  }

  .vuc-btn_content {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0 4px;

    i {
      margin-right: 5px;
      font-size: inherit;
    }
  }

  &:disabled {
    opacity: 0.4;
    pointer-events: none;
  }

  &:active {
    background-color: $color-prim;
    div,
    span {
      color: #fff !important;
    }
  }

  &.x--loading {
    opacity: 0.7;
    pointer-events: none;
    .vuc-btn_content {
      visibility: hidden;
    }
  }
}
</style>
