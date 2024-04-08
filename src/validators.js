import { BUTTON_TYPES, NAV_ITEMS, HOURS_IN_DAY, MIDNIGHT_HOUR } from './constants'
import { ICONS } from './icons'

// -----------------------------------------------------------------------------

function isString(value) {
  return typeof value === 'string'
}

function isSelectOptionValid({ value, label }) {
  return isNumber(value) || (isNotEmptyString(value) && isNotEmptyString(label))
}

function isBetween(value, start, end) {
  return value >= start && value <= end
}

// -----------------------------------------------------------------------------

export function isNotEmptyString(value) {
  return isString(value) && value.length > 0
}

export function isNull(value) {
  return value === null
}

export function isHourValid(hour) {
  return isNumber(hour) && isBetween(hour, MIDNIGHT_HOUR, HOURS_IN_DAY - 1)
}

export function isPageValid(page) {
  return NAV_ITEMS.some((navItem) => navItem.page === page)
}

export function isNavItemValid(navItem) {
  return NAV_ITEMS.includes(navItem)
}

export function isTimelineItemValid({ hour }) {
  return isHourValid(hour)
}

export function validateSelectOptions(options) {
  return options.every(isSelectOptionValid)
}

export function validateTimelineItems(timelineItems) {
  return timelineItems.every(isTimelineItemValid)
}

export function isUndefinedOrNull(value) {
  return isUndefined(value) || isNull(value)
}

export function isNumberOrNull(value) {
  return isNumber(value) || isNull(value)
}

export function isActivityValid({ id, name, secondsToComplete }) {
  if (isNull(id)) {
    return true
  }
  return [isNotEmptyString(id), isNotEmptyString(name), isNumber(secondsToComplete)].every(Boolean)
}

export function validateActivities(activities) {
  return activities.every(isActivityValid)
}

export function isButtonTypeValid(type) {
  return BUTTON_TYPES.includes(type)
}

export function isUndefined(value) {
  return value === undefined
}

export function isSelectValueValid(value) {
  return isNumber(value) || isNull(value) || isNotEmptyString(value)
}

export function isNumber(value) {
  return typeof value === 'number'
}

export function isIconValid(icon) {
  return Object.keys(ICONS).includes(icon)
}
