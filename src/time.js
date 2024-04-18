import { computed, ref } from 'vue'
import {
  HUNDRED_PERCENT,
  SECONDS_IN_DAY,
  MILISECONDS_IN_SECOND,
  SECONDS_IN_MINUTE
} from '@/constants'

// -----------------------------------------------------------------------------

const date = new Date()
date.setHours(0, 0)

export const now = ref(date)
let timer = null
const midnight = computed(() => new Date(now.value).setHours(0, 0, 0, 0))
const secondsSinceMidnight = computed(() => (now.value - midnight.value) / MILISECONDS_IN_SECOND)

export const secondsSinceMidnightInPercentage = computed(
  () => (HUNDRED_PERCENT * secondsSinceMidnight.value) / SECONDS_IN_DAY
)

export function startTimer() {
  now.value = date
  timer = setInterval(() => {
    now.value = new Date(now.value.getTime() + SECONDS_IN_MINUTE * MILISECONDS_IN_SECOND)
  }, MILISECONDS_IN_SECOND)
}

export function stopTimer() {
  clearInterval(timer)
}
