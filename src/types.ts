export enum PageName {
  TIMELINE = 'timeline',
  ACTIVITIES = 'activities',
  PROGRESS = 'progress'
}

export interface Activity {
  id: string
  name: string
  secondsToComplete: number
}

export interface SelectOption<T = string> {
  value: T
  label: string
}

export interface State {
  timelineItems: TimelineItem[]
  activities: Activity[]
  lastActiveAt: Date
}

export interface TimelineItem {
  hour: Hour
  activityId: Activity['id'] | null
  activitySeconds: number
  isActive: boolean
}

export enum ButtonType {
  NEUTRAL = 'neutral',
  DANGER = 'danger',
  PRIMARY = 'primary',
  SUCCESS = 'success',
  WARNING = 'warning'
}

export interface NavItem {
  page: PageName
  icon: IconName
}

export enum ProgressColorClass {
  RED = 'bg-red-500',
  YELLOW = 'bg-yellow-500',
  BLUE = 'bg-blue-500',
  GREEN = 'bg-green-500'
}

export type Hour =
  | 1
  | 2
  | 3
  | 4
  | 5
  | 6
  | 7
  | 8
  | 9
  | 10
  | 11
  | 12
  | 13
  | 14
  | 15
  | 16
  | 17
  | 18
  | 19
  | 20
  | 21
  | 22
  | 23

export enum IconName {
  CHECK_CIRCLE = 'CheckCircle',
  LIST_BULLET = 'ListBullet',
  ARROW_PATH = 'ArrowPath',
  CHART_BAR = 'ChartBar',
  CLOCK = 'Clock',
  TRASH = 'Trash',
  X_MARK = 'XMark',
  PAUSE = 'Pause',
  PLUS = 'Plus',
  PLAY = 'Play'
}
