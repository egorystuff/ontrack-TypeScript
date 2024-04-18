import { APP_NAME } from './constants'

export function load() {
  const state = localStorage.getItem(APP_NAME)

  return state ? JSON.parse(state) : {}
}

export function save(date) {
  localStorage.setItem(
    APP_NAME,
    JSON.stringify({
      ...date,
      date: new Date().toDateString()
    })
  )
}
