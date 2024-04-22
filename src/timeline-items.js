import { computed, ref } from 'vue'
import { HOURS_IN_DAY, MIDNIGHT_HOUR } from './constants'
import { now } from './time'
// import { activities } from './activities'

// -----------------------------------------------------------------------------

export const timelineItems = ref(generateTimelineItems())

export const timelineItemRefs = ref([])

export const activeTimelineItem = computed(() =>
  timelineItems.value.find(({ isActive }) => isActive)
)

export function updateTimelineItem(timelineItem, fields) {
  return Object.assign(timelineItem, fields)
}

export function resetTimelineItemActivities(timelineItems, activity) {
  filterTimelineItemsByActivity(timelineItems, activity).forEach((timelineItem) =>
    updateTimelineItem(timelineItem, {
      activityId: null,
      activitySeconds: timelineItem.hour === now.value.getHours() ? timelineItem.activitySeconds : 0
    })
  )
}

export function calculateTrackedActivitySeconds(timelineItems, activity) {
  return filterTimelineItemsByActivity(timelineItems, activity)
    .map(({ activitySeconds }) => activitySeconds)
    .reduce((total, seconds) => Math.round(total + seconds), 0)
}

export function resetTimelineItems(timelineItems) {
  return timelineItems.map((timelineItem) => ({
    ...timelineItem,
    activitySeconds: 0,
    isActive: false
  }))
}

export function scrollToCurrentHour(isSmooth = true) {
  scrollToHour(now.value.getHours(), isSmooth)
}

export function scrollToHour(hour, isSmooth = true) {
  const el = hour === MIDNIGHT_HOUR ? document.body : timelineItemRefs.value[hour - 1].$el
  el.scrollIntoView({ behavior: isSmooth ? 'smooth' : 'instant' })
}

function filterTimelineItemsByActivity(timelineItems, { id }) {
  return timelineItems.filter(({ activityId }) => activityId === id)
}

function generateTimelineItems() {
  return [...Array(HOURS_IN_DAY).keys()].map((hour) => ({
    hour,
    activityId: null, //[0, 1, 2, 3, 4].includes(hour) ? activities.value[hour % 3].id : null,
    activitySeconds: 0, // [0, 1, 2, 3, 4].includes(hour) ? hour * 600 : 0,
    isActive: false
  }))
}
