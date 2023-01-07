<template>
  <div class="content">
    <header>
      <div v-if="devMode">Development Mode Active</div>
    </header>

    <RouterView />

    <footer>
      <span>v{{ version }}</span
      ><button @click="openLog" title="Open Log File" role="Open Log File">
        <CodeIcon icon="output" />
      </button>
    </footer>
  </div>
</template>

<script setup lang="ts">
import CodeIcon from "./components/CodeIcon.vue";
import { vscode } from "./services/vscode.service";

const devMode = import.meta.env.DEV;
const version = window.VERSION;

const openLog = () => vscode.postMessage("openLog");
</script>
