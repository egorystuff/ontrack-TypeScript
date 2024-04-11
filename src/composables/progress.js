import { computed } from 'vue'
import { calculateActivityCompletionPercentage } from '@/activities'
import { timelineItems, calculateTrackedActivitySeconds } from '@/timeline-items'
import { getProgressColorClass } from '../functions'

// -----------------------------------------------------------------------------

export function useProgress(activity) {
  const colorClass = computed(() => getProgressColorClass(percentage.value))

  const percentage = computed(() =>
    calculateActivityCompletionPercentage(activity, trackedSeconds.value)
  )

  const trackedSeconds = computed(() =>
    calculateTrackedActivitySeconds(timelineItems.value, activity)
  )

  return {
    percentage,
    trackedSeconds,
    colorClass
  }
}
