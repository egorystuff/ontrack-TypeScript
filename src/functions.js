import {
  PAGE_TIMELINE,
  PAGE_ACTIVITIES,
  PAGE_PROGRESS,
  HOURS_IN_DAY,
  SECONDS_IN_HOUR,
  MINUTE_IN_HOUR,
  SECONDS_IN_MINUTE,
  MILISECONDS_IN_SECOND
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

export function getTotalActivitySeconds(activity, timelineItems) {
  return timelineItems
    .filter((timelineItem) => timelineItem.activityId === activity.id)
    .reduce(
      (totalSeconds, timelineItem) => Math.round(timelineItem.activitySeconds + totalSeconds),
      0
    )
}

export function generateTimelineItems(activities) {
  return [...Array(HOURS_IN_DAY).keys()].map((hour) => ({
    hour,
    activityId: [0, 1, 2, 3, 4].includes(hour) ? activities[hour % 3].id : null,
    activitySeconds: [0, 1, 2, 3, 4].includes(hour) ? hour * 600 : 0
  }))
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

export function generatePeriodSelectoptions() {
  const periodInMinutes = [
    15, 30, 45, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330, 360, 420, 480
  ]

  return periodInMinutes.map((periodInMinutes) => {
    return {
      value: periodInMinutes * SECONDS_IN_MINUTE,
      label: generatePeriodSelectOptionsLabel(periodInMinutes)
    }
  })
}

function generatePeriodSelectOptionsLabel(periodInMinutes) {
  const hours = Math.floor(periodInMinutes / MINUTE_IN_HOUR)
    .toString()
    .padStart(2, 0)
  const minutes = (periodInMinutes % MINUTE_IN_HOUR).toString().padStart(2, 0)

  return `${hours}:${minutes}`
}

export function formatSeconds(seconds) {
  const date = new Date()
  date.setTime(Math.abs(seconds) * MILISECONDS_IN_SECOND)

  const utc = date.toUTCString()
  return utc.substring(utc.indexOf(':') - 2, utc.indexOf(':') + 6)
}
