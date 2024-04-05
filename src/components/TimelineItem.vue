<script setup>
import { activitySelectOptions } from '@/activities'
import { updateTimelineItem } from '@/timeline-items'
import { isTimelineItemValid, isUndefined } from '../validators'
import BaseSelect from './BaseSelect.vue'
import TimelineHour from './TimelineHour.vue'
import TimelineStopWatch from './TimelineStopWatch.vue'

defineProps({
  timelineItem: {
    required: true,
    type: Object,
    validator: isTimelineItemValid
  }
})

const emit = defineEmits({
  scrollToHour: isUndefined
})
</script>

<template>
  <li class="relative flex flex-col gap-2 border-t border-gray-200 py-10 px-4">
    <TimelineHour :hour="timelineItem.hour" @click.prevent="emit('scrollToHour')" />
    <BaseSelect
      :selected="timelineItem.activityId"
      :options="activitySelectOptions"
      placeholder="Rest"
      @select="updateTimelineItem(timelineItem, { activityId: $event })"
    />

    <TimelineStopWatch :timeline-item="timelineItem" />
  </li>
</template>
