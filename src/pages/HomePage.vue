<template>
  <div>
    <TheHeader />
    <div class="mx-auto max-w-screen-md pt-14">
      <router-view v-slot="{ Component }">
        <transition name="slide-in" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </div>
  </div>
</template>

<script setup lang="ts">
import TheHeader from "../components/TheHeader.vue";
</script>

<style lang="scss"></style>
