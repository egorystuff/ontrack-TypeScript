import { ref, watchEffect } from 'vue'
import { MILISECONDS_IN_SECOND } from './constants'
import { now } from './time'
import { updateTimelineItem, activeTimelineItem } from './timeline-items'

export const timelineItemTimer = ref(false)

export function startTimelineItemTimer(timelineItem) {
  updateTimelineItem(timelineItem, { isActive: true })

  timelineItemTimer.value = setInterval(() => {
    updateTimelineItem(timelineItem, {
      activitySeconds: timelineItem.activitySeconds + 1
    })
  }, MILISECONDS_IN_SECOND)
}

export function stopTimelineItemTimer(timelineItem) {
  updateTimelineItem(timelineItem, { isActive: false })

  clearInterval(timelineItemTimer.value)
  timelineItemTimer.value = false
}

export function resetTimelineItemTimer(timelineItem) {
  updateTimelineItem(timelineItem, { activitySeconds: 0 })

  stopTimelineItemTimer(timelineItem)
}

watchEffect(() => {
  if (activeTimelineItem.value && activeTimelineItem.value.hour !== now.value.getHours())
    stopTimelineItemTimer(activeTimelineItem)
})
