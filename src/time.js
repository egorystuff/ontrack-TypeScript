import { computed, ref } from 'vue'
import {
  HUNDRED_PERCENT,
  SECONDS_IN_DAY,
  MILISECONDS_IN_SECOND,
  SECONDS_IN_HOUR
} from '@/constants'

// -----------------------------------------------------------------------------
export function today() {
  const today = new Date()
  // today.setHours(0, 0)
  return today
}

export function tomorrow() {
  const tomorrow = today()
  tomorrow.setDate(tomorrow.getDate() + 1)
  tomorrow.setHours(0, 0)
  return tomorrow
}

export function isToday(date) {
  return date.toDateString() === today().toDateString()
}

export const now = ref(today())

let currentDateTimer = null

const midnight = computed(() => new Date(now.value).setHours(0, 0, 0, 0))

const secondsSinceMidnight = computed(() => (now.value - midnight.value) / MILISECONDS_IN_SECOND)

export const secondsSinceMidnightInPercentage = computed(
  () => (HUNDRED_PERCENT * secondsSinceMidnight.value) / SECONDS_IN_DAY
)

export function startCurrentDateTimer() {
  now.value = today()
  currentDateTimer = setInterval(() => {
    now.value = new Date(now.value.getTime() + MILISECONDS_IN_SECOND)
  }, MILISECONDS_IN_SECOND)
}

export function stopCurrentDateTimer() {
  clearInterval(currentDateTimer)
}

export function toSeconds(milliseconds) {
  return Math.round(milliseconds / MILISECONDS_IN_SECOND)
}

export function endOfHour(data) {
  const endOfHour = new Date(data)
  endOfHour.setTime(endOfHour.getTime() + SECONDS_IN_HOUR * MILISECONDS_IN_SECOND)
  endOfHour.setMinutes(0, 0, 0)
  return endOfHour
}
