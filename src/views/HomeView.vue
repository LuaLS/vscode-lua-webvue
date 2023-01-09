<template>
  <main>
    <vscode-panels>
      <vscode-panel-tab
        >BROWSE<vscode-badge>{{
          remoteAddonStore.total
        }}</vscode-badge></vscode-panel-tab
      >
      <vscode-panel-tab
        >INSTALLED<vscode-badge>{{
          localAddonStore.total
        }}</vscode-badge></vscode-panel-tab
      >
      <vscode-panel-view id="browse">
        <BrowseAddons />
      </vscode-panel-view>
      <vscode-panel-view id="installed">
        <InstalledAddons />
      </vscode-panel-view>
    </vscode-panels>
  </main>
</template>

<script setup lang="ts">
import BrowseAddons from "./RemoteAddons.vue";
import InstalledAddons from "./InstalledAddons.vue";
import { useLocalAddonsStore } from "@/stores/localAddons.store";
import { useRemoteAddonStore } from "@/stores/remoteAddons";
import {
  provideVSCodeDesignSystem,
  vsCodeBadge,
  vsCodePanels,
  vsCodePanelTab,
  vsCodePanelView,
} from "@vscode/webview-ui-toolkit";

const localAddonStore = useLocalAddonsStore();
const remoteAddonStore = useRemoteAddonStore();

provideVSCodeDesignSystem().register(
  vsCodePanels(),
  vsCodePanelTab(),
  vsCodePanelView(),
  vsCodeBadge()
);
</script>
