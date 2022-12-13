<template>
  <div class="addon">
    <div>
      <h2>
        <a
          :href="`https://github.com/${REPOSITORY_OWNER}/${REPOSITORY_NAME}/tree/main/${ADDONS_DIRECTORY}/${addon.path}`"
          target="_blank"
          ref="nofollow noreferrer noopener external"
        >
          {{ addon.name }}<CodeIcon icon="link-external" />
        </a>
      </h2>
      <Truncate :limit="350" :text="description" class="description" />
    </div>
    <div class="right">
      <button class="download"><CodeIcon icon="cloud-download" /></button>
      <div>{{ size }}</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import CodeIcon from "@/components/CodeIcon.vue";
import Truncate from "./Truncate.vue";
import { ADDONS_DIRECTORY, REPOSITORY_NAME, REPOSITORY_OWNER } from "@/config";

import type { Addon } from "@/services/addon.service";

const props = defineProps<{ addon: Addon }>();

const description = computed(
  () => props.addon.description ?? "Description could not be loaded"
);

const bytesToKiloBytes = (bytes: number) => (bytes / 1024).toFixed(2);

const size = computed(() => {
  return `${bytesToKiloBytes(props.addon.size ?? 0)} KB`;
});
</script>

<style lang="scss">
.addon {
  display: flex;
  justify-content: space-between;
  align-items: stretch;
  gap: 1rem;
  margin: 0px 3px;

  .description {
    padding: 0.1em;
  }

  .right {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    justify-content: space-between;

    .download .codicon {
      font-size: 1.3em;
      vertical-align: middle;
    }
  }

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
}
</style>
