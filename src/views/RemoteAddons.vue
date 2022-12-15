<template>
  <div id="browser">
    <div class="controls">
      <button class="refresh" @click="addonStore.getList">
        <CodeIcon icon="refresh" />
      </button>
    </div>
    <vscode-progress-ring v-if="addonStore.loading" />
    <div v-else class="addons">
      <RemoteAddon
        v-for="(addon, index) of addonStore.addons"
        :key="index"
        :addon="addon"
      />
    </div>
  </div>
</template>
<script setup lang="ts">
import { watch, onMounted } from "vue";
import CodeIcon from "@/components/CodeIcon.vue";
import RemoteAddon from "@/components/RemoteAddon.vue";
import { useAddonStore } from "@/stores/addons";
import { useAuthStore } from "@/stores/auth";

import {
  provideVSCodeDesignSystem,
  vsCodeProgressRing,
} from "@vscode/webview-ui-toolkit";

provideVSCodeDesignSystem().register(vsCodeProgressRing());

const authStore = useAuthStore();
const addonStore = useAddonStore();

onMounted(() => {
  const clearWatch = watch(
    () => authStore.access_token,
    () => {
      addonStore.getList();
      clearWatch();
    }
  );
});
</script>

<style lang="scss">
#browser {
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
