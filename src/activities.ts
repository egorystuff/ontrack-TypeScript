import { ref, computed } from 'vue'
import { SECONDS_IN_HOUR, HUNDRED_PERCENT } from './constants'
import { id } from './functions'
import type { Activity, SelectOption, State } from './types'

// -----------------------------------------------------------------------------

export const activities = ref<Activity[]>([])

export const activitySelectOptions = computed<SelectOption[]>(() =>
  generateActivitySelectOtions(activities.value)
)

export function initializeActivities(state: State): void {
  activities.value = state.activities || []
}

export const trackedActivities = computed<Activity[]>(() =>
  activities.value.filter(({ secondsToComplete }): boolean => secondsToComplete !== 0)
)

export function calculateActivityCompletionPercentage(
  { secondsToComplete }: Activity,
  trackedSeconds: number
): number {
  return Math.floor((trackedSeconds * HUNDRED_PERCENT) / secondsToComplete)
}

export function calculateCompletionPercentage(totalTrackedSeconds: number): number {
  return Math.floor((totalTrackedSeconds * HUNDRED_PERCENT) / totalActivitySecondsToComplete.value)
}

export function deleteActivity(activity: Activity): void {
  activities.value.splice(activities.value.indexOf(activity), 1)
}

export function createActivity(activity: Activity): void {
  activities.value.push(activity)
}

export function updateActivity(activity: Activity, fields: Partial<Activity>): Activity {
  return Object.assign(activity, fields)
}

const totalActivitySecondsToComplete = computed(() => {
  return trackedActivities.value
    .map(({ secondsToComplete }): number => secondsToComplete)
    .reduce((total, seconds) => total + seconds, 0)
})

function generateActivitySelectOtions(activities: Activity[]): SelectOption[] {
  return activities.map((activity): SelectOption => ({ label: activity.name, value: activity.id }))
}

// function generateActivities() {
//   return ['Coding', 'Training', 'Reading', 'Learning'].map((name, hours) => ({
//     id: id(),
//     name,
//     secondsToComplete: 15 * 60 // hours * SECONDS_IN_HOUR
//   }))
// }
