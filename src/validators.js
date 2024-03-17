import { NAV_ITEMS, HOURS_IN_DAY, MIDNIGHT_HOUR } from './constants'

// -----------------------------------------------------------------------------

function isNull(value) {
  return value === null
}

function isUndefined(value) {
  return value === undefined
}

function isNumber(value) {
  return typeof value === 'number'
}

function isString(value) {
  return typeof value === 'string'
}

function isSelectOptionValid({ value, label }) {
  return isNumber(value) && isString(label)
}

function isBetween(value, start, end) {
  return value >= start && value <= end
}

function isHourValid(hour) {
  return isNumber(hour) && isBetween(hour, MIDNIGHT_HOUR, HOURS_IN_DAY - 1)
}

// -----------------------------------------------------------------------------

export function isPageValid(page) {
  return Object.keys(NAV_ITEMS).includes(page)
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
  return isNumber(value) && isNull(value)
}
