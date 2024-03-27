<script setup>
import { nextTick, ref, watchPostEffect } from 'vue'
import {
  validateTimelineItems,
  validateSelectOptions,
  validateActivities,
  isTimelineItemValid,
  isActivityValid,
  isPageValid,
  isNumber
} from '../validators'
import TimelineItem from '../components/TimelineItem.vue'
import { MIDNIGHT_HOUR, PAGE_TIMELINE } from '@/constants'

const props = defineProps({
  timelineItems: {
    required: true,
    type: Array,
    validator: validateTimelineItems
  },
  activities: {
    required: true,
    type: Array,
    validator: validateActivities
  },
  activitySelectOptions: {
    required: true,
    type: Array,
    validator: validateSelectOptions
  },
  currentPage: {
    required: true,
    type: String,
    validator: isPageValid
  }
})

defineExpose({ scrollToHour })

const timelineItemRefs = ref([])

const emit = defineEmits({
  updateTimelineItemActivitySeconds(timelineItem, activitySeconds) {
    return [isTimelineItemValid(timelineItem), isNumber(activitySeconds)].every(Boolean)
  },

  setTimelineItemActivity(timelineItem, activity) {
    return [isTimelineItemValid(timelineItem), isActivityValid(activity)].every(Boolean)
  }
})

watchPostEffect(async () => {
  if (props.currentPage === PAGE_TIMELINE) {
    await nextTick()
    scrollToHour(null)
  }
})

function scrollToHour(hour = null, isSmooth = true) {
  hour ??= new Date().getHours()
  const options = { behavior: isSmooth ? 'smooth' : 'instant' }

  if (hour === MIDNIGHT_HOUR) {
    document.body.scrollIntoView(options)
  } else {
    timelineItemRefs.value[hour - 1].$el.scrollIntoView(options)
  }
}
</script>

<template>
  <div class="mt-7">
    <ul>
      <TimelineItem
        v-for="timelineItem in timelineItems"
        :key="timelineItem.hour"
        :timeline-item="timelineItem"
        :activity-select-options="activitySelectOptions"
        :activities="activities"
        ref="timelineItemRefs"
        @update-activity-seconds="emit('updateTimelineItemActivitySeconds', timelineItem, $event)"
        @scroll-to-hour="scrollToHour"
        @select-activity="emit('setTimelineItemActivity', timelineItem, $event)"
      />
    </ul>
  </div>
</template>
