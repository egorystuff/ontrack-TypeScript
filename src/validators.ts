import { BUTTON_TYPES, NAV_ITEMS, HOURS_IN_DAY, MIDNIGHT_HOUR } from './constants'
import { ICONS } from './icons'

// -----------------------------------------------------------------------------

function isString(value: any): boolean {
  return typeof value === 'string'
}

function isSelectOptionValid({ value, label }: any): boolean {
  return isNumber(value) || (isNotEmptyString(value) && isNotEmptyString(label))
}

function isBetween(value: any, start: any, end: any): boolean {
  return value >= start && value <= end
}

function isNotEmptyString(value: any): boolean {
  return isString(value) && value.length > 0
}

function isUndefined(value: any): boolean {
  return value === undefined
}

function isNumber(value: any): boolean {
  return typeof value === 'number'
}

// -----------------------------------------------------------------------------

export function isNull(value: any): boolean {
  return value === null
}

export function isHourValid(hour: any): boolean {
  return isNumber(hour) && isBetween(hour, MIDNIGHT_HOUR, HOURS_IN_DAY - 1)
}

export function isPageValid(page: any): boolean {
  return NAV_ITEMS.some((navItem): boolean => navItem.page === page)
}

export function isNavItemValid(navItem: any): boolean {
  return NAV_ITEMS.includes(navItem)
}

export function isTimelineItemValid({ hour }: any): boolean {
  return isHourValid(hour)
}

export function validateSelectOptions(options: any): boolean {
  return options.every(isSelectOptionValid)
}

export function isUndefinedOrNull(value: any): boolean {
  return isUndefined(value) || isNull(value)
}

export function isActivityValid({ id, name, secondsToComplete }: any): boolean {
  if (isNull(id)) {
    return true
  }
  return [isNotEmptyString(id), isNotEmptyString(name), isNumber(secondsToComplete)].every(Boolean)
}

export function isButtonTypeValid(type: any): boolean {
  return BUTTON_TYPES.includes(type)
}

export function isSelectValueValid(value: any): boolean {
  return isNumber(value) || isNull(value) || isNotEmptyString(value)
}

export function isIconValid(icon: any): boolean {
  return Object.keys(ICONS).includes(icon)
}
