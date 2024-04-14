import { computed } from 'vue'
import { calculateCompletionPercentage, trackedActivities } from '@/activities'
import { timelineItems, calculateTrackedActivitySeconds } from '@/timeline-items'
import { getProgressColorClass } from '../functions'

// -----------------------------------------------------------------------------

export function useTotalProgress() {
  const colorClass = computed(() => getProgressColorClass(percentage.value))

  const percentage = computed(() => calculateCompletionPercentage(totalTrackedSeconds.value))

  const totalTrackedSeconds = computed(() => {
    return trackedActivities.value
      .map((activity) =>
        Math.min(
          calculateTrackedActivitySeconds(timelineItems.value, activity),
          activity.secondsToComplete
        )
      )
      .reduce((total, seconds) => total + seconds, 0)
  })

  return {
    percentage,
    colorClass
  }
}
