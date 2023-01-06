<template>
  <header>
    <div v-if="devMode">Development Mode Active</div>
  </header>

  <RouterView />

  <footer>
    <span>v{{ version }}</span>
  </footer>
</template>

<script setup lang="ts">
const devMode = import.meta.env.DEV;
const version = window.VERSION;
</script>
