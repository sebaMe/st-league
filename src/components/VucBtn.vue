<template>
  <component :is="tag" :class="classes" :disabled="disabled" @click="emitClick">
    <v-progress-circular
      class="vuc-btn_spinner"
      v-if="loading"
      color="secondary"
      :indeterminate="true"
    ></v-progress-circular>
    <div class="vuc-btn_content">
      <vuc-icon v-if="icon.length > 0">{{icon}}</vuc-icon>
      <slot></slot>
      <span  v-if="charge" class="charge-indicator">{{`${charged ? '!' : "?"}`}}</span>
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
    charge: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      charged: false
    };
  },
  methods: {
    emitClick() {
      if (this.charge === false || this.charged) {
        this.charged = false;
        this.$emit("click");
      } else {
        this.charged = true;
      }
    }
  },
  computed: {
    classes() {
      return [
        "component__vuc-btn",
        { "x--loading": this.loading },
        { "x--charged": this.charged }
      ];
    }
  }
};
</script>

<style lang="scss">
.component__vuc-btn {
  @include font-bangers;
  @include border-comic;
  @include card-shadow-low;

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
    }

    .charge-indicator {
      margin-left: 5px;
    }
  }

  &:disabled {
    opacity: 0.4;
    color: grey;
    border-color: grey;
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

  &.x--charged {
    color: #fff;
    border-color: $color-sec;
    background-color: $color-sec;
  }
}
</style>
