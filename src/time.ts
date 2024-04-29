import { computed, ref } from 'vue'
import {
  HUNDRED_PERCENT,
  SECONDS_IN_DAY,
  MILISECONDS_IN_SECOND,
  SECONDS_IN_HOUR
} from '@/constants'

// -----------------------------------------------------------------------------

export const now = ref(today())

const midnight = computed((): number => new Date(now.value).setHours(0, 0, 0, 0))

const secondsSinceMidnight = computed(
  (): number => ((now.value as any) - midnight.value) / MILISECONDS_IN_SECOND
)

export const secondsSinceMidnightInPercentage = computed(
  (): number => (HUNDRED_PERCENT * secondsSinceMidnight.value) / SECONDS_IN_DAY
)

export function today(): Date {
  return new Date()
}

export function tomorrow(): Date {
  const tomorrow = today()
  tomorrow.setDate(tomorrow.getDate() + 1)
  tomorrow.setHours(0, 0)
  return tomorrow
}

export function isToday(date: Date): Boolean {
  return date.toDateString() === today().toDateString()
}

export function startCurrentDateTimer(): void {
  setInterval((): void => {
    now.value = today()
  }, MILISECONDS_IN_SECOND)
}

export function toSeconds(milliseconds: number): number {
  return Math.round(milliseconds / MILISECONDS_IN_SECOND)
}

export function endOfHour(data: Date): Date {
  const endOfHour = new Date(data)
  endOfHour.setTime(endOfHour.getTime() + SECONDS_IN_HOUR * MILISECONDS_IN_SECOND)
  endOfHour.setMinutes(0, 0, 0)
  return endOfHour
}
