<template>
  <div id="local">
    <div class="controls">
      <button class="refresh" :disabled="addonStore.loading" @click="refresh">
        <CodeIcon icon="refresh" />
      </button>
    </div>
    <vscode-progress-ring v-if="addonStore.loading" />
    <div v-else>
      <div v-if="addons.length === 0">
        <h2 class="text-center">None Installed</h2>
      </div>
      <div v-else class="addons">
        <LocalAddon
          v-for="(addon, index) of addons"
          :key="index"
          :addon="addon"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useInstalledAddonStore } from "@/stores/installedAddons";
import LocalAddon from "@/components/LocalAddon.vue";
import CodeIcon from "@/components/CodeIcon.vue";

import {
  provideVSCodeDesignSystem,
  vsCodeProgressRing,
} from "@vscode/webview-ui-toolkit";

provideVSCodeDesignSystem().register(vsCodeProgressRing());

const addonStore = useInstalledAddonStore();

const addons = computed(() => addonStore.sortedByName);

const refresh = () => {
  if (addonStore.loading) return;
  addonStore.getList();
};
</script>

<style scoped lang="scss">
#local {
  width: 100%;

  > .controls {
    display: flex;
    justify-content: flex-end;
    padding: 0px 0.3rem;

    .refresh span {
      vertical-align: middle;
    }
  }

  > vscode-progress-ring {
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
