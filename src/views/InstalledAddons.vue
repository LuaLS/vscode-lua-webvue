<template>
  <div id="local">
    <div class="controls">
      <button class="refresh" @click="addonStore.getList">
        <CodeIcon icon="refresh" />
      </button>
    </div>
    <vscode-progress-ring v-if="addonStore.loading" />
    <div v-else>
      <div v-if="addonStore.addons.length === 0">
        <h2>None Installed</h2>
      </div>
      <div v-else class="addons">
        <LocalAddon
          v-for="(addon, index) of addonStore.addons"
          :key="index"
          :addon="addon"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useInstalledAddonStore } from "@/stores/installedAddons";
import LocalAddon from "@/components/LocalAddon.vue";
import CodeIcon from "@/components/CodeIcon.vue";

import {
  provideVSCodeDesignSystem,
  vsCodeProgressRing,
} from "@vscode/webview-ui-toolkit";

provideVSCodeDesignSystem().register(vsCodeProgressRing());

const addonStore = useInstalledAddonStore();
</script>

<style lang="scss">
#local {
  width: 100%;

  .controls {
    display: flex;
    justify-content: flex-end;
    padding: 0px 0.3rem;

    .refresh span {
      vertical-align: middle;
    }
  }

  vscode-progress-ring {
    transform: translateX(-50%);
    position: relative;
    left: 50%;
  }

  .addons {
    display: flex;
    flex-direction: column;
    gap: 0.4em;
  }
}
</style>
