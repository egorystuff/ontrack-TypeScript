<script setup lang="ts">
import { currentPage, navigate } from '../router'
import { scrollToCurrentHour } from '../timeline-items'
import { IconName, PageName } from '../types'

import BaseIcon from './BaseIcon.vue'

function handleClick(): void {
  currentPage.value === PageName.TIMELINE ? scrollToCurrentHour() : navigate(PageName.TIMELINE)
}
</script>

<!-- --------------------------------------------------------------------------------- -->

<template>
  <a
    :href="`#${PageName.TIMELINE}`"
    @click="handleClick"
    class="scale-115 origin-left rounded bg-black text-white"
  >
    <BaseIcon :name="IconName.CLOCK" class="h-10" />
  </a>
</template>
