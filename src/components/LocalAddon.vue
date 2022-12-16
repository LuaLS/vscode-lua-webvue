<template>
  <Addon :addon="props.addon">
    <template #badges>
      <span v-if="versionNotSame" class="badge">
        <CodeIcon icon="repo-pull" />Update Available
      </span>
    </template>
    <template #controls>
      <vscode-button v-if="versionNotSame" @click="remoteAddon?.download"
        >Update</vscode-button
      >
    </template>
    <template #quick-actions>
      <button class="uninstall" @click="addon.uninstall">
        <CodeIcon icon="trash" />
      </button>
    </template>
  </Addon>
</template>

<script setup lang="ts">
import type { LocalAddon } from "@/services/addon.service";

import { computed } from "vue";
import CodeIcon from "@/components/CodeIcon.vue";
import Addon from "./Addon.vue";
import { useAddonStore } from "@/stores/addons";
import {
  provideVSCodeDesignSystem,
  vsCodeButton,
} from "@vscode/webview-ui-toolkit";

provideVSCodeDesignSystem().register(vsCodeButton());

const props = defineProps<{ addon: LocalAddon }>();

// Get remote version of this addon to compare versions
const remoteAddonStore = useAddonStore();
const remoteAddon = computed(() => remoteAddonStore.getAddon(props.addon.name));
const versionNotSame = computed(
  () => remoteAddon.value?.hash !== props.addon.hash
);
</script>
