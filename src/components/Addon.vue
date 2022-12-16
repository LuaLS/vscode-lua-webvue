<template>
  <div class="addon">
    <div>
      <div class="top">
        <h1>
          <a
            :href="url"
            target="_blank"
            ref="nofollow noreferrer noopener external"
            >{{ addon.name }}<CodeIcon icon="link-external"
          /></a>
        </h1>
        <span class="badges">
          <span class="badge hash"
            ><CodeIcon icon="git-commit" />{{ hash }}</span
          >
          <slot name="badges" />
        </span>
      </div>
      <p class="description truncate">
        {{ description }}
      </p>
      <div class="controls">
        <slot name="controls" />
      </div>
    </div>
    <div class="right">
      <div class="top">
        <div class="quick-actions">
          <slot name="quick-actions" />
        </div>
      </div>
      <div class="bottom">
        {{ size }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Addon } from "@/services/addon.service";

import CodeIcon from "./CodeIcon.vue";

import { REPOSITORY_OWNER, REPOSITORY_NAME, ADDONS_DIRECTORY } from "@/config";
import { defineProps, computed } from "vue";
import { formatBytes } from "@/services/format.service";

const props = defineProps<{ addon: Addon }>();

const url = `https://github.com/${REPOSITORY_OWNER}/${REPOSITORY_NAME}/tree/main/${ADDONS_DIRECTORY}/${props.addon.name}`;

const hash = computed(() => props.addon.hash?.slice(0, 7) ?? "NO HASH");
const description = computed(() => props.addon.description ?? "No Description");
const size = computed(() =>
  props.addon.size ? formatBytes(props.addon.size) : "? B"
);
</script>

<style lang="scss">
.addon {
  display: flex;
  justify-content: space-between;
  align-items: stretch;
  gap: 0.2rem;
  position: relative;
  background-color: #40404038;
  padding: 0.5rem 0.4rem;
  border-radius: 0.2rem;

  .top {
    display: flex;
    flex-wrap: wrap;
    align-items: center;

    h1 {
      font-size: 2rem;
      margin: 0;
      margin-right: 0.2rem;
      width: fit-content;
      display: inline-block;

      a {
        display: inline-block;
        border-radius: 0.1em;
        padding: 0.1em;
        color: inherit;
        text-decoration: none;

        span.codicon.codicon-link-external {
          font-size: 0.3em;
          vertical-align: top;
          margin: 0.2em 0px 0px 0.2em;
        }

        &:hover {
          background: rgba(90, 93, 94, 0.31);
        }
      }
    }

    span.badges {
      display: inline-flex;
      justify-content: space-around;
      gap: 0.3rem;

      span.badge > span.codicon[class*="codicon-"] {
        font-size: 1.2em;
        margin-right: 0.2rem;
        vertical-align: middle;
        padding: 0.2rem 0px;
      }
    }
  }

  p.description {
    --lh: 1.2em;
    --lines: 2;
    padding: 0.1em;
    margin: 0px;
  }

  .controls {
    margin: 0.3em 0.1em 0px 0.1em;
  }

  .right {
    display: flex;
    flex-direction: column;
    flex: 1 0 4.4em;
    align-items: flex-end;
    justify-content: space-between;

    .quick-actions {
      span.codicon[class*="codicon-"] {
        font-size: 1.3em;
        vertical-align: middle;
      }
    }
  }
}
</style>
