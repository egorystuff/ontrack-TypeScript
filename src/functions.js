import {
  PAGE_TIMELINE,
  PAGE_ACTIVITIES,
  PAGE_PROGRESS,
  HOURS_IN_DAY,
  SECONDS_IN_HOUR
} from './constants'
import { isNull } from './validators'

// ------------------------------------------------------------------------------------------

export function normalizePageHash() {
  const hash = window.location.hash.slice(1)
  if ([PAGE_TIMELINE, PAGE_ACTIVITIES, PAGE_PROGRESS].includes(hash)) {
    return hash
  } else {
    window.location.hash = PAGE_TIMELINE
    return PAGE_TIMELINE
  }
}

export function generateTimelineItems() {
  const timelineItems = []
  for (let hour = 0; hour < HOURS_IN_DAY; hour++) {
    timelineItems.push({ hour, activityId: null })
  }
  return timelineItems
}

export function generateActivitySelectOtions(activities) {
  return activities.map((activity) => ({ label: activity.name, value: activity.id }))
}

export function id() {
  return Date.now().toString(36) + Math.random().toString(36).substring(2)
}

export function generateActivities() {
  return ['Coding', 'Training', 'Reading', 'Learning'].map((name, hours) => ({
    id: id(),
    name,
    secondsToComplete: hours * SECONDS_IN_HOUR
  }))
}

export function normalizeSelectValue(value) {
  return isNull(value) || isNaN(value) ? value : +value
}
