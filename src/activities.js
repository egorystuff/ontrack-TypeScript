import { ref, computed } from 'vue'
import { SECONDS_IN_HOUR } from './constants'
import { id } from './functions'

export const activities = ref(generateActivities())

export const activitySelectOptions = computed(() => generateActivitySelectOtions(activities.value))

export function deleteActivity(activity) {
  activities.value.splice(activities.value.indexOf(activity), 1)
}

export function createActivity(activity) {
  activities.value.push(activity)
}

export function setActivitySecondToComplete(activity, secondsToComplete) {
  activity.secondsToComplete = secondsToComplete || 0
}

function generateActivitySelectOtions(activities) {
  return activities.map((activity) => ({ label: activity.name, value: activity.id }))
}

function generateActivities() {
  return ['Coding', 'Training', 'Reading', 'Learning'].map((name, hours) => ({
    id: id(),
    name,
    secondsToComplete: hours * SECONDS_IN_HOUR
  }))
}
