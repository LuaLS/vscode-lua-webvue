<template>
  <Addon :addon="props.addon">
    <template #badges>
      <span v-if="localAddon" class="badge">
        <CodeIcon icon="pass" />Installed
      </span>
    </template>
    <template #quick-actions>
      <button class="download" @click="addon.download">
        <CodeIcon icon="cloud-download" />
      </button>
    </template>
  </Addon>
</template>

<script setup lang="ts">
import type { RemoteAddon } from "@/services/addon.service";

import Addon from "./Addon.vue";
import CodeIcon from "@/components/CodeIcon.vue";

import { computed } from "vue";
import { useInstalledAddonStore } from "@/stores/installedAddons";

const props = defineProps<{ addon: RemoteAddon }>();

const installedAddonStore = useInstalledAddonStore();
const localAddon = computed(() =>
  installedAddonStore.getAddon(props.addon.name)
);
</script>
