import { type ComputedRef, computed } from 'vue'
import { calculateActivityCompletionPercentage } from '../activities'
import { timelineItems, calculateTrackedActivitySeconds } from '../timeline-items'
import { getProgressColorClass } from '../functions'
import type { Activity, ProgressColorClass } from '../types'

// -----------------------------------------------------------------------------

export function useProgress(activity: Activity): {
  percentage: ComputedRef<number>
  trackedActivitySeconds: ComputedRef<number>
  colorClass: ComputedRef<ProgressColorClass>
} {
  const colorClass = computed((): ProgressColorClass => getProgressColorClass(percentage.value))

  const percentage = computed((): number =>
    calculateActivityCompletionPercentage(activity, trackedActivitySeconds.value)
  )

  const trackedActivitySeconds = computed((): number =>
    calculateTrackedActivitySeconds(timelineItems.value, activity)
  )

  return {
    percentage,
    trackedActivitySeconds,
    colorClass
  }
}
