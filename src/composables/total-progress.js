import { computed } from 'vue'
import { calculateCompletionPercentage, trackedActivities } from '@/activities'
import { timelineItems, calculateTrackedActivitySeconds } from '@/timeline-items'
import { getProgressColorClass } from '../functions'

// -----------------------------------------------------------------------------

export function useTotalProgress() {
  const colorClass = computed(() => getProgressColorClass(percentage.value))

  const percentage = computed(() => calculateCompletionPercentage(totalTrackedSeconds.value))

  const totalTrackedSeconds = computed(() => {
    return trackedActivities.value.reduce((total, activity) => {
      let trackedSeconds = calculateTrackedActivitySeconds(timelineItems.value, activity)

      trackedSeconds =
        trackedSeconds < activity.secondsToComplete ? trackedSeconds : activity.secondsToComplete
      return total + trackedSeconds
    })
  })

  return {
    percentage,
    colorClass
  }
}
