<template>
  <div class="addon">
    <div class="left">
      <h2>
        <a
          :href="`https://github.com/${REPOSITORY_OWNER}/${REPOSITORY_NAME}/tree/main/${ADDONS_DIRECTORY}/${addon.path}`"
          target="_blank"
          ref="nofollow noreferrer noopener external"
        >
          {{ addon.name }}<CodeIcon icon="link-external" />
        </a>
      </h2>
      <p class="description truncate">
        {{ description }}
      </p>
    </div>
    <div class="right">
      <button class="download" @click="download">
        <CodeIcon icon="cloud-download" />
      </button>
      <div>{{ size }}</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import CodeIcon from "@/components/CodeIcon.vue";
import { ADDONS_DIRECTORY, REPOSITORY_NAME, REPOSITORY_OWNER } from "@/config";
import { vscode } from "@/services/vscode.service";
import { formatBytes } from "@/services/format.service";

import type { Addon } from "@/services/addon.service";

const props = defineProps<{ addon: Addon }>();

const description = computed(
  () => props.addon.description ?? "Description could not be loaded"
);
const size = computed(() => {
  return formatBytes(props.addon.size ?? 0);
});

/** Request that VS Code download an addon */
const download = () => {
  const tree = props.addon.tree;

  if (!tree)
    throw Error(`Tree does not exist for "${props.addon.name}" addon!`);

  // Get just the data that is important
  const data = tree.map((node) => {
    return { path: node.path, type: node.type };
  });

  // Send command to VS Code to download the included tree
  vscode.postMessage(
    JSON.stringify({
      command: "download",
      name: props.addon.name,
      tree: data,
    })
  );
};
</script>

<style lang="scss">
.addon {
  display: flex;
  justify-content: space-between;
  align-items: stretch;
  gap: 0.2rem;
  background-color: #5a5d5e1e;
  padding: 0.3rem;
  border-radius: 0.2rem;

  .left {
    h2 {
      margin: 0px 0px 0.3rem 0px;
      padding: 0.1em;
      border-radius: 0.1em;
      width: fit-content;

      a {
        color: inherit;
        text-decoration: none;

        span.codicon[class*="codicon-"] {
          font-size: 0.4em;
          vertical-align: top;
          margin: 0.2em 0px 0px 0.2em;
        }
      }

      &:hover {
        background: rgba(90, 93, 94, 0.31);
      }
    }

    .description {
      --lh: 1.2em;
      --lines: 2;
      padding: 0.1em;
      margin: 0px;
    }
  }

  .right {
    display: flex;
    flex: 1 0 3.3rem;
    flex-direction: column;
    align-items: flex-end;
    justify-content: space-around;

    .download .codicon {
      font-size: 1.3em;
      vertical-align: middle;
    }
  }
}
</style>
