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
        :aria-label="`Update ${name}`"
        :title="`Update ${name}`"
        >Update</vscode-button
      >
      <vscode-button
        v-if="!enabled"
        :disabled="!workspaceOpen"
        :aria-label="`Enable ${name}`"
        :title="
          !workspaceOpen ? 'There is no workspace open' : `Enable ${name}`
        "
        @click="addon.enable"
        appearance="primary"
        >Enable</vscode-button
      >
      <vscode-button
        v-if="enabled"
        :disabled="!workspaceOpen"
        :aria-label="`Disable ${name}`"
        :title="
          !workspaceOpen ? 'There is no workspace open' : `Disable ${name}`
        "
        @click="addon.disable"
        appearance="primary"
        >Disable</vscode-button
      >
      <vscode-button
        :aria-label="`Uninstall ${name}`"
        :title="`Uninstall ${name}`"
        @click="addon.uninstall"
        appearance="secondary"
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
import { useAppStore } from "@/stores/app";

provideVSCodeDesignSystem().register(vsCodeButton());

const props = defineProps<{ addon: LocalAddon }>();

const remoteAddonStore = useAddonStore();
const appStore = useAppStore();

// Get remote version of this addon to compare versions
const remoteAddon = computed(() => remoteAddonStore.getAddon(props.addon.name));
const updateAvailable = computed(() =>
  remoteAddon.value?.commitDate?.isAfter(props.addon.installDate)
);

const workspaceOpen = computed(() => appStore.workspaceOpen);

const name = computed(() => props.addon.name);
const enabled = computed(() => props.addon.enabled);
const commitDate = computed(() => props.addon.installDate?.fromNow());
</script>
