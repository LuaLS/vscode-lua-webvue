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
        <span class="hash"><CodeIcon icon="git-commit" /> {{ hash }}</span>
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
const hash = computed(() => props.addon.latestHash?.slice(0, 7));

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
  background-color: #b3b3b326;
  padding: 0.3rem;
  border-radius: 0.2rem;
  font-size: 1.3em;

  .left {
    h2 {
      margin: 0px;
      width: fit-content;

      a {
        display: inline-block;
        border-radius: 0.1em;
        padding: 0.1em;
        color: inherit;
        text-decoration: none;

        span.codicon[class*="codicon-"] {
          font-size: 0.3em;
          vertical-align: top;
          margin: 0.2em 0px 0px 0.2em;
        }

        &:hover {
          background: rgba(90, 93, 94, 0.31);
        }
      }

      .hash {
        font-size: 0.5em;
        line-height: 1;
        vertical-align: middle;
        background-color: #4d4d4d;
        padding: 0.1em 0.4em 0.1em 0.2em;
        border-radius: 0.2em;
        width: fit-content;
        margin-left: 0.5em;

        span.codicon {
          font-size: 0.8em;
        }
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
    flex: 1 0 4.4rem;
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
