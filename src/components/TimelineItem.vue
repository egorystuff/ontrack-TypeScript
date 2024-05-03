<script setup lang="ts">
import { activitySelectOptions } from '../activities'
import { updateTimelineItem } from '../timeline-items'
import type { TimelineItem } from '../types'
import BaseSelect from './BaseSelect.vue'
import TimelineHour from './TimelineHour.vue'
import TimelineStopWatch from './TimelineStopWatch.vue'

defineProps<{ timelineItem: TimelineItem }>()
</script>

<template>
  <li class="relative flex flex-col gap-2 border-t border-gray-200 px-4 py-10">
    <TimelineHour :hour="timelineItem.hour" />
    <BaseSelect
      :selected="timelineItem.activityId"
      :options="activitySelectOptions"
      placeholder="Rest"
      @select="updateTimelineItem(timelineItem, { activityId: $event })"
    />

    <TimelineStopWatch :timeline-item="timelineItem" />
  </li>
</template>
