<template>
  <Addon :addon="props.addon">
    <template #badges>
      <span class="badge" v-if="commitDate"
        ><CodeIcon icon="cloud-download" />{{ commitDate }}</span
      >
      <span v-if="updateAvailable" class="badge">
        <CodeIcon icon="repo-pull" />Update Available
      </span>
    </template>
    <template #controls>
      <vscode-button
        v-if="updateAvailable"
        @click="remoteAddon?.download"
        :aria-label="`Update ${props.addon.name}`"
        :title="`Update ${props.addon.name}`"
        >Update</vscode-button
      >
      <vscode-button @click="addon.uninstall" appearance="secondary"
        >Uninstall</vscode-button
      >
    </template>
  </Addon>
</template>

<script setup lang="ts">
import type { LocalAddon } from "@/services/addon.service";

import { computed } from "vue";
import CodeIcon from "@/components/CodeIcon.vue";
import Addon from "./Addon.vue";
import { useAddonStore } from "@/stores/remoteAddons";
import {
  provideVSCodeDesignSystem,
  vsCodeButton,
} from "@vscode/webview-ui-toolkit";

provideVSCodeDesignSystem().register(vsCodeButton());

const props = defineProps<{ addon: LocalAddon }>();

// Get remote version of this addon to compare versions
const remoteAddonStore = useAddonStore();
const remoteAddon = computed(() => remoteAddonStore.getAddon(props.addon.name));
const updateAvailable = computed(() =>
  remoteAddon.value?.commitDate?.isAfter(props.addon.installDate)
);

const commitDate = computed(() => props.addon.installDate?.fromNow());
</script>
