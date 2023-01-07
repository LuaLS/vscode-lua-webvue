<template>
  <main>
    <vscode-panels>
      <vscode-panel-tab>BROWSE</vscode-panel-tab>
      <vscode-panel-tab>INSTALLED</vscode-panel-tab>
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

import {
  provideVSCodeDesignSystem,
  vsCodePanels,
  vsCodePanelTab,
  vsCodePanelView,
} from "@vscode/webview-ui-toolkit";
provideVSCodeDesignSystem().register(
  vsCodePanels(),
  vsCodePanelTab(),
  vsCodePanelView()
);
</script>
