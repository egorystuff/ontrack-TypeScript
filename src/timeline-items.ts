import { computed, ref, watch } from 'vue'
import { HOURS_IN_DAY, MIDNIGHT_HOUR } from './constants'
import { endOfHour, isToday, now, toSeconds, today } from './time'
import { stopTimelineItemTimer } from './timeline-item-timer'
import type { Activity, State, TimelineItem } from './types'
// import { activities } from './activities'

// -----------------------------------------------------------------------------

export const timelineItems = ref<TimelineItem[]>([])

export const timelineItemRefs = ref<any>([])

export const activeTimelineItem = computed((): TimelineItem | undefined =>
  timelineItems.value.find(({ isActive }): boolean => isActive)
)

watch<Date>(now, (after, before): void => {
  if (activeTimelineItem.value && activeTimelineItem.value.hour !== after.getHours())
    stopTimelineItemTimer()

  if (before.getHours() !== after.getHours() && after.getHours() === MIDNIGHT_HOUR)
    resetTimelineItems()
})

export function initializeTimelineItems(state: State): void {
  const lastActiveAt = new Date(state.lastActiveAt)

  timelineItems.value = state.timelineItems ?? generateTimelineItems()

  if (activeTimelineItem.value && isToday(lastActiveAt)) {
    syncIdleSeconds(lastActiveAt)
  } else if (state.timelineItems && !isToday(lastActiveAt)) {
    resetTimelineItems()
  }
}

export function updateTimelineItem(timelineItem: TimelineItem, fields: any): TimelineItem {
  return Object.assign(timelineItem, fields)
}

export function resetTimelineItemActivities(
  timelineItems: TimelineItem[],
  activity: Activity
): void {
  filterTimelineItemsByActivity(timelineItems, activity).forEach(
    (timelineItem: TimelineItem): void => {
      updateTimelineItem(timelineItem, {
        activityId: null,
        activitySeconds: timelineItem.hour === today().getHours() ? timelineItem.activitySeconds : 0
      })
    }
  )
}

export function calculateTrackedActivitySeconds(
  timelineItems: TimelineItem[],
  activity: Activity
): number {
  return filterTimelineItemsByActivity(timelineItems, activity)
    .map(({ activitySeconds }: TimelineItem): number => activitySeconds)
    .reduce((total: number, seconds: number): number => Math.round(total + seconds), 0)
}

export function scrollToCurrentHour(isSmooth = true): void {
  scrollToHour(today().getHours(), isSmooth)
}

export function scrollToHour(hour: number, isSmooth = true): void {
  const el: any = hour === MIDNIGHT_HOUR ? document.body : timelineItemRefs.value[hour - 1].$el
  el.scrollIntoView({ behavior: isSmooth ? 'smooth' : 'instant' })
}

function filterTimelineItemsByActivity(
  timelineItems: TimelineItem[],
  { id }: Activity
): TimelineItem[] {
  return timelineItems.filter(({ activityId }): boolean => activityId === id)
}

function generateTimelineItems(): TimelineItem[] {
  return [...Array(HOURS_IN_DAY).keys()].map(
    (hour): TimelineItem => ({
      hour,
      activityId: null, //[0, 1, 2, 3, 4].includes(hour) ? activities.value[hour % 3].id : null,
      activitySeconds: 0, // [0, 1, 2, 3, 4].includes(hour) ? hour * 600 : 0,
      isActive: false
    })
  )
}

function syncIdleSeconds(lastActiveAt: Date): void {
  updateTimelineItem(activeTimelineItem.value as any, {
    activitySeconds:
      (activeTimelineItem.value as any).activitySeconds + calculateIdolSeconds(lastActiveAt)
  })
}

function calculateIdolSeconds(lastActiveAt: Date): number {
  return lastActiveAt.getHours() === today().getHours()
    ? toSeconds((today() as any) - (lastActiveAt as any))
    : toSeconds((endOfHour(lastActiveAt) as any) - (lastActiveAt as any))
}

function resetTimelineItems(): void {
  return timelineItems.value.forEach((timelineItem): void => {
    updateTimelineItem(timelineItem, {
      activitySeconds: 0,
      isActive: false
    })
  })
}