import { ref, computed } from 'vue'
import { SECONDS_IN_HOUR, HUNDRED_PERCENT } from './constants'
import { id } from './functions'

// -----------------------------------------------------------------------------

export const activities = ref(generateActivities())

export const activitySelectOptions = computed(() => generateActivitySelectOtions(activities.value))

export const trackedActivities = computed(() =>
  activities.value.filter(({ secondsToComplete }) => secondsToComplete)
)

export function calculateActivityCompletionPercentage({ secondsToComplete }, trackedSeconds) {
  return Math.floor((trackedSeconds * HUNDRED_PERCENT) / secondsToComplete)
}

export function deleteActivity(activity) {
  activities.value.splice(activities.value.indexOf(activity), 1)
}

export function createActivity(activity) {
  activities.value.push(activity)
}

export function updateActivity(activity, fields) {
  return Object.assign(activity, fields)
}

function generateActivitySelectOtions(activities) {
  return activities.map((activity) => ({ label: activity.name, value: activity.id }))
}

function generateActivities() {
  return ['Coding', 'Training', 'Reading', 'Learning'].map((name, hours) => ({
    id: id(),
    name,
    secondsToComplete: 15 * 60 // hours * SECONDS_IN_HOUR
  }))
}
