<template>
  <span class="codicon" :class="`codicon-${icon}`"></span>
</template>

<script setup lang="ts">
import { defineProps } from "vue";

type Props = {
  icon: string;
};

defineProps<Props>();
</script>
