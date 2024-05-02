import { NAV_ITEMS } from './constants'
import { ICONS } from './icons'

// -----------------------------------------------------------------------------

function isString(value: any): boolean {
  return typeof value === 'string'
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

export function isPageValid(page: any): boolean {
  return NAV_ITEMS.some((navItem): boolean => navItem.page === page)
}

export function isUndefinedOrNull(value: any): boolean {
  return isUndefined(value) || isNull(value)
}

export function isSelectValueValid(value: any): boolean {
  return isNumber(value) || isNull(value) || isNotEmptyString(value)
}

export function isIconValid(icon: any): boolean {
  return Object.keys(ICONS).includes(icon)
}
