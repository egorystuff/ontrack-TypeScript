import { computed, ref } from 'vue'
import { HUNDRED_PERCENT, SECONDS_IN_DAY, MILISECONDS_IN_SECOND } from '@/constants'

// -----------------------------------------------------------------------------

export const now = ref(new Date())
let timer = null
const midnight = computed(() => new Date(now.value).setHours(0, 0, 0, 0))
const secondsSinceMidnight = computed(() => (now.value - midnight.value) / MILISECONDS_IN_SECOND)

export const secondsSinceMidnightInPercentage = computed(
  () => (HUNDRED_PERCENT * secondsSinceMidnight.value) / SECONDS_IN_DAY
)

export function startTimer() {
  now.value = new Date()
  timer = setInterval(() => {
    now.value = new Date(now.value.getTime() + 5 * 60 * MILISECONDS_IN_SECOND)
  }, MILISECONDS_IN_SECOND)
}

export function stopTimer() {
  clearInterval(timer)
}
