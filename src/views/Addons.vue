<template>
  <div id="local">
    <div class="controls">
      <button class="refresh" :disabled="addonStore.loading" @click="refresh">
        <CodeIcon icon="refresh" />
      </button>
    </div>
    <div v-if="addons.length === 0">
      <h2 class="text-center">None Installed</h2>
    </div>
    <div v-else class="addons">
      <Addon v-for="(addon, index) of addons" :key="index" :addon="addon" />
    </div>
    <vscode-progress-ring v-if="addonStore.loading" />
    <vscode-button
      v-if="
        addonStore.total &&
        addons.length > 0 &&
        addons.length < addonStore.total
      "
      @click="addonStore.getPage()"
      :disabled="addonStore.loading"
      class="more"
      >Load More</vscode-button
    >
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted } from "vue";
import { useAddonStore } from "@/stores/addonStore";
import CodeIcon from "@/components/CodeIcon.vue";

import {
  provideVSCodeDesignSystem,
  vsCodeProgressRing,
} from "@vscode/webview-ui-toolkit";
import Addon from "@/components/Addon.vue";

provideVSCodeDesignSystem().register(vsCodeProgressRing());

const addonStore = useAddonStore();

const addons = computed(() => addonStore.sortedByName);

const refresh = () => {
  if (addonStore.loading) return;
  addonStore.addons = [];
  addonStore.refresh();
};

onMounted(() => addonStore.getPage());
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

  .more {
    display: block;
    width: fit-content;
    margin: 1rem auto 1rem auto;
  }
}
</style>
