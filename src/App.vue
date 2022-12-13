<template>
  <header>
    <div v-if="devMode">Development Mode Active</div>
  </header>

  <RouterView />
</template>

<script setup lang="ts">
const devMode = import.meta.env.DEV;
</script>
