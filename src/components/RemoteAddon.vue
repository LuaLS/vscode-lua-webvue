<template>
  <Addon :addon="props.addon">
    <template #badges>
      <span class="badge" v-if="commitDate" :title="commitDate">
        <CodeIcon icon="git-commit" /> {{ commitSince }}
      </span>
      <span class="badge" v-if="addon.hasPlugin">Plugin</span>
    </template>
    <template #controls>
      <vscode-button v-if="!installedAddonStore.loading && installed" disabled
        >Installed</vscode-button
      >
      <vscode-button
        v-if="!installedAddonStore.loading && !installed"
        :aria-label="`Install ${addon.name}`"
        :title="`Install ${addon.name}`"
        @click="download"
        >Install</vscode-button
      >
    </template>
  </Addon>
</template>

<script setup lang="ts">
import type { RemoteAddon } from "@/types/addon";

import { computed } from "vue";
import dayjs from "dayjs";

import Addon from "./Addon.vue";
import { useLocalAddonsStore } from "@/stores/localAddons.store";

import {
  provideVSCodeDesignSystem,
  vsCodeButton,
} from "@vscode/webview-ui-toolkit";
import { vscode } from "@/services/vscode.service";
import CodeIcon from "./CodeIcon.vue";

provideVSCodeDesignSystem().register(vsCodeButton());

const props = defineProps<{ addon: RemoteAddon }>();

const installedAddonStore = useLocalAddonsStore();
const installed = computed(
  () => installedAddonStore.getAddon(props.addon.name) !== undefined
);

const commitSince = computed(() =>
  dayjs(props.addon.latestCommitTimestamp)?.fromNow()
);
const commitDate = computed(() =>
  dayjs(props.addon.latestCommitTimestamp)?.format("MMMM DD, YYYY, h:mm A")
);

const download = () => {
  vscode.postMessage("install", {
    name: props.addon.name,
  });
};
</script>
