import {
  MINUTE_IN_HOUR,
  SECONDS_IN_MINUTE,
  MILISECONDS_IN_SECOND,
  HUNDRED_PERCENT,
  MEDIUM_PERCENT,
  LOW_PERCENT
} from './constants'
import { isNull } from './validators'

enum ProgressColorClass {
  RED = 'bg-red-500',
  YELLOW = 'bg-yellow-500',
  BLUE = 'bg-blue-500',
  GREEN = 'bg-green-500'
}

interface PeriodSelectOption {
  value: number
  label: string
}

// ------------------------------------------------------------------------------------------

export function id(): string {
  return Date.now().toString(36) + Math.random().toString(36).substring(2)
}

export function normalizeSelectValue(value: any): any {
  return isNull(value) || isNaN(value) ? value : +value
}

export function generatePeriodSelectoptions(): PeriodSelectOption[] {
  const periodInMinutes = [
    15, 30, 45, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330, 360, 420, 480
  ]
  return periodInMinutes.map((periodInMinutes): PeriodSelectOption => {
    return {
      value: periodInMinutes * SECONDS_IN_MINUTE,
      label: generatePeriodSelectOptionsLabel(periodInMinutes)
    }
  })
}

export function getProgressColorClass(percentage: number): ProgressColorClass {
  if (percentage < LOW_PERCENT) return ProgressColorClass.RED
  if (percentage < MEDIUM_PERCENT) return ProgressColorClass.YELLOW
  if (percentage < HUNDRED_PERCENT) return ProgressColorClass.BLUE
  return ProgressColorClass.GREEN
}

export function formatSecondsWithSign(seconds: number): string {
  return `${seconds >= 0 ? '+' : '-'}${formatSeconds(seconds)}`
}

export function formatSeconds(seconds: number): string {
  const date = new Date()
  date.setTime(Math.abs(seconds) * MILISECONDS_IN_SECOND)
  const utc = date.toUTCString()
  return utc.substring(utc.indexOf(':') - 2, utc.indexOf(':') + 6)
}

function generatePeriodSelectOptionsLabel(periodInMinutes: number): string {
  const hours = Math.floor(periodInMinutes / MINUTE_IN_HOUR)
    .toString()
    .padStart(2, '0')
  const minutes = (periodInMinutes % MINUTE_IN_HOUR).toString().padStart(2, '0')
  return `${hours}:${minutes}`
}
