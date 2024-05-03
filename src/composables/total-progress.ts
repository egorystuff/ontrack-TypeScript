import { type ComputedRef, computed } from 'vue'
import { calculateCompletionPercentage, trackedActivities } from '../activities'
import { timelineItems, calculateTrackedActivitySeconds } from '../timeline-items'
import { getProgressColorClass } from '../functions'
import type { ProgressColorClass } from '../types'

// -----------------------------------------------------------------------------

export function useTotalProgress(): {
  percentage: ComputedRef<number>
  colorClass: ComputedRef<ProgressColorClass>
} {
  const colorClass = computed((): ProgressColorClass => getProgressColorClass(percentage.value))

  const percentage = computed((): number =>
    calculateCompletionPercentage(totalTrackedSeconds.value)
  )

  const totalTrackedSeconds = computed((): number => {
    return trackedActivities.value
      .map((activity: any): number =>
        Math.min(
          calculateTrackedActivitySeconds(timelineItems.value, activity),
          activity.secondsToComplete
        )
      )
      .reduce((total: any, seconds: any): number => total + seconds, 0)
  })

  return {
    percentage,
    colorClass
  }
}
