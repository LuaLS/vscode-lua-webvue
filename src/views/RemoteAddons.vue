<template>
  <div id="browser">
    <div class="controls">
      <button @click="refresh" :disabled="addonStore.loading" class="refresh">
        <CodeIcon icon="refresh" />
      </button>
    </div>
    <div class="addons">
      <RemoteAddon
        v-for="(addon, index) of addons"
        :key="index"
        :addon="addon"
      />
    </div>
    <vscode-progress-ring v-if="addonStore.loading" />
    <vscode-button
      v-if="addonStore.total && addons.length < addonStore.total"
      @click="addonStore.getPage()"
      :disabled="addonStore.loading"
      class="more"
      >Load More</vscode-button
    >
  </div>
</template>
<script setup lang="ts">
import { onMounted, computed } from "vue";
import CodeIcon from "@/components/CodeIcon.vue";
import RemoteAddon from "@/components/RemoteAddon.vue";
import { useRemoteAddonStore } from "@/stores/remoteAddons";

import {
  provideVSCodeDesignSystem,
  vsCodeProgressRing,
  vsCodeButton,
} from "@vscode/webview-ui-toolkit";

provideVSCodeDesignSystem().register(vsCodeProgressRing(), vsCodeButton());

const addonStore = useRemoteAddonStore();

const addons = computed(() => addonStore.sortedByName);

const refresh = () => {
  if (addonStore.loading) return;
  addonStore.addons = [];
  addonStore.getPage(1);
};

onMounted(() => addonStore.getPage());
</script>

<style lang="scss">
#browser {
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
    gap: 0.4rem;
  }

  .more {
    display: block;
    width: fit-content;
    margin: 1rem auto 1rem auto;
  }
}
</style>
