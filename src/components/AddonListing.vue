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
      <button class="download"><CodeIcon icon="cloud-download" /></button>
      <div>{{ size }}</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import CodeIcon from "@/components/CodeIcon.vue";
import { ADDONS_DIRECTORY, REPOSITORY_NAME, REPOSITORY_OWNER } from "@/config";
import { formatBytes } from "@/services/format.service";

import type { Addon } from "@/services/addon.service";

const props = defineProps<{ addon: Addon }>();

const description = computed(
  () => props.addon.description ?? "Description could not be loaded"
);
const size = computed(() => {
  return formatBytes(props.addon.size ?? 0);
});
</script>

<style lang="scss">
.addon {
  display: flex;
  justify-content: space-between;
  align-items: stretch;
  gap: 0.2rem;

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
      --lh: 1.1em;
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
