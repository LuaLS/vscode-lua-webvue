<template>
  <span v-if="truncate">{{ text.substring(0, limit) }}...</span>
  <span v-else>{{ text }}</span>
</template>

<script setup lang="ts">
import { defineProps, computed } from "vue";

type Props = {
  text: string;
  limit: number;
};

const props = defineProps<Props>();

const truncate = computed(() => props.text.length > props.limit);
</script>
