<template>
  <div class="content">
    <RouterView />

    <footer>
      <div v-if="devMode" id="dev-warn">Development Mode Active</div>
      <span class="versions">
        <span title="WebVue Version">
          <CodeIcon icon="preview" /> v{{ version }}
        </span>
        <span title="Lua Extension Version">
          <CodeIcon icon="server" />v{{ appStore.clientVersion }}
        </span>
      </span>
      <span>
        <a
          :href="FEEDBACK_URL"
          target="_blank"
          rel="nofollow noreferrer noopener external"
          title="Feedback"
        >
          <CodeIcon icon="feedback" />
        </a>
        <button @click="openLog" title="Open Log File" role="Open Log File">
          <CodeIcon icon="output" />
        </button>
      </span>
    </footer>
  </div>
</template>

<script setup lang="ts">
import "@vscode/codicons/dist/codicon.css";
import CodeIcon from "./components/CodeIcon.vue";
import { vscode } from "./services/vscode.service";
import { useAppStore } from "./stores/app";
import { FEEDBACK_URL } from "./config";

const appStore = useAppStore();

const devMode = import.meta.env.DEV;
const version = import.meta.env.APP_VERSION;

const openLog = () => vscode.postMessage("openLog");
</script>
