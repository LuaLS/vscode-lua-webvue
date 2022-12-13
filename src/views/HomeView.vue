<template>
  <main>
    <vscode-panels>
      <vscode-panel-tab>BROWSE</vscode-panel-tab>
      <vscode-panel-tab>INSTALLED</vscode-panel-tab>
      <vscode-panel-view id="browse">
        <div>
          <div class="controls">
            <CodeIcon class="refresh" icon="refresh" @click="refreshAddons" />
          </div>
          <div v-if="addonStore.loading" class="loading">
            <vscode-progress-ring />
          </div>
          <div class="addons" v-else>
            <AddonListing
              v-for="(addon, index) in addonStore.addons"
              :key="index"
              :addon="addon"
            />
          </div>
        </div>
      </vscode-panel-view>
      <vscode-panel-view id="installed">
        <h1>None Installed</h1>
      </vscode-panel-view>
    </vscode-panels>
    <button @click="send">Send Message</button>
  </main>
</template>

<script setup lang="ts">
import { vscode } from "@/services/vscode.service";
import { watch } from "vue";
import { useAuthStore } from "@/stores/auth";
import { useAddonStore } from "@/stores/addons";
import AddonListing from "@/components/AddonListing.vue";
import {
  provideVSCodeDesignSystem,
  vsCodePanels,
  vsCodePanelTab,
  vsCodePanelView,
  vsCodeProgressRing,
} from "@vscode/webview-ui-toolkit";
import CodeIcon from "@/components/CodeIcon.vue";
provideVSCodeDesignSystem().register(
  vsCodePanels(),
  vsCodePanelTab(),
  vsCodePanelView(),
  vsCodeProgressRing()
);

const authStore = useAuthStore();
const addonStore = useAddonStore();

const refreshAddons = () => {
  addonStore.getList();
};

const send = () => {
  vscode.postMessage({ command: "Hello World!" });
};

watch(
  () => authStore.access_token,
  () => {
    addonStore.getList();
  }
);
</script>

<style lang="scss">
#browse {
  & > div {
    width: 100%;
  }

  .controls {
    .refresh {
      display: block;
      width: fit-content;
      margin: auto 0px auto auto;
    }
  }

  .loading {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  .addons {
    .addon {
      width: 100%;
      margin: 1rem auto;
    }
  }
}
</style>
