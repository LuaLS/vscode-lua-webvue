<template>
  <Addon :addon="props.addon">
    <template #badges>
      <span class="badge" v-if="commitDate">Updated {{ commitDate }}</span>
    </template>
    <template #controls>
      <vscode-button v-if="!installedAddonStore.loading && localAddon" disabled
        >Installed</vscode-button
      >
      <vscode-button
        v-if="!installedAddonStore.loading && !localAddon"
        @click="props.addon.download"
        >Install</vscode-button
      >
    </template>
  </Addon>
</template>

<script setup lang="ts">
import type { RemoteAddon } from "@/services/addon.service";

import Addon from "./Addon.vue";

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

const commitDate = computed(() => props.addon.commitDate?.fromNow());
</script>
