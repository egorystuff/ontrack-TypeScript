<script setup>
import { inject } from 'vue'
import { isTimelineItemValid, isUndefined } from '../validators'
import { activitySelectOptionsKey, setTimelineItemActivityKey } from '../keys'
import BaseSelect from './BaseSelect.vue'
import TimelineHour from './TimelineHour.vue'
import TimelineStopWatch from './TimelineStopWatch.vue'

const activitySelectOptions = inject(activitySelectOptionsKey)
const setTimelineItemActivity = inject(setTimelineItemActivityKey)

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
      @select="setTimelineItemActivity(timelineItem, $event)"
    />

    <TimelineStopWatch :timeline-item="timelineItem" />
  </li>
</template>
