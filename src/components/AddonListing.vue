<template>
  <div class="addon">
    <div>
      <h2>{{ addon.name }}</h2>
      <Truncate :limit="350" :text="description" />
    </div>
    <div class="right">
      <CodeIcon icon="link-external" />
      <div>{{ size }}</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import CodeIcon from "@/components/CodeIcon.vue";
import Truncate from "./Truncate.vue";

import type { Addon } from "@/services/addon.service";

const props = defineProps<{ addon: Addon }>();

const description = computed(
  () => props.addon.description ?? "Description could not be loaded"
);

const bytesToKiloBytes = (bytes: number) => (bytes / 1024).toFixed(2);

const size = computed(() => {
  return `${bytesToKiloBytes(props.addon.size ?? 0)} KB`;
});
</script>

<style lang="scss">
.addon {
  display: flex;
  justify-content: space-between;
  align-items: stretch;
  gap: 1rem;

  .right {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    justify-content: space-between;
  }
}
h2 {
  margin: 0px 0px 0.5rem 0px;
}
</style>
