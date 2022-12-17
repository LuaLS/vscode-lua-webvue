<template>
  <Addon :addon="props.addon">
    <template #controls>
      <vscode-button
        v-if="localAddon === undefined"
        @click="props.addon.download"
        >Install</vscode-button
      >
      <vscode-button v-if="localAddon" disabled>Installed</vscode-button>
    </template>
  </Addon>
</template>

<script setup lang="ts">
import type { RemoteAddon } from "@/services/addon.service";

import Addon from "./Addon.vue";
import CodeIcon from "@/components/CodeIcon.vue";

import { computed } from "vue";
import { useInstalledAddonStore } from "@/stores/installedAddons";

import {
  provideVSCodeDesignSystem,
  vsCodeButton,
} from "@vscode/webview-ui-toolkit";

provideVSCodeDesignSystem().register(vsCodeButton());

const props = defineProps<{ addon: RemoteAddon }>();

const installedAddonStore = useInstalledAddonStore();
const localAddon = computed(() =>
  installedAddonStore.getAddon(props.addon.name)
);
</script>
