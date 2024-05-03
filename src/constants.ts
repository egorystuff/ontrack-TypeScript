import { generatePeriodSelectoptions } from './functions'
import { ButtonType, IconName, PageName, type NavItem } from './types'

export const HOURS_IN_DAY = 24
export const MIDNIGHT_HOUR = 0
export const SECONDS_IN_MINUTE = 60
export const MINUTE_IN_HOUR = 60
export const SECONDS_IN_HOUR = SECONDS_IN_MINUTE * MINUTE_IN_HOUR
export const SECONDS_IN_DAY = SECONDS_IN_HOUR * HOURS_IN_DAY
export const MILISECONDS_IN_SECOND = 1000

export const NAV_ITEMS: NavItem[] = [
  { page: PageName.TIMELINE, icon: IconName.CLOCK },
  { page: PageName.ACTIVITIES, icon: IconName.LIST_BULLET },
  { page: PageName.PROGRESS, icon: IconName.CHART_BAR }
]

export const BUTTON_TYPES: ButtonType[] = [
  ButtonType.NEUTRAL,
  ButtonType.DANGER,
  ButtonType.PRIMARY,
  ButtonType.SUCCESS,
  ButtonType.WARNING
]

export const LOW_PERCENT = 33
export const MEDIUM_PERCENT = 66
export const HUNDRED_PERCENT = 100

export const PERIOD_SELECT_OPTIONS = generatePeriodSelectoptions()

export const LOCAL_STORAGE_KEY = 'ontrack-typescript'
