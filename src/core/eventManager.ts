import canUseDOM from '../lib/canUseDom'
// import { idAndEventFromString } from '../lib/helpers'
import CONSTS from '../lib/__consts'
import { idAndEventFromString, onlyUnique } from '../lib/helpers'

export type EventType = string
export type Handler<T = any> = (args?: T) => void

export interface EventManagerProps<E = EventType> {
  on<T = any>(event: E, handler: Handler<T>): EventManagerProps<E>
  off<T = any>(event: E, handler?: Handler<T>): EventManagerProps<E>
  emit(event: E, MouseEvent: MouseEvent): EventManagerProps<E>
}

class EventManager implements EventManagerProps {
  eventList = new Map()
  contextMenuEvent = (event: MouseEvent) => {
    const target = event.target as HTMLElement
    const closest = target.closest(`[data-circumstance-id]`) as HTMLElement
    if (closest) {
      const data = closest.dataset || {}
      if (data?.circumstanceId) {
        return this.emit(`${data.circumstanceId}.show`, event)
      }
    }
    return this.emit(CONSTS.EVENTS.HIDE_ALL, event)
  }

  clickEvent = (event: MouseEvent) => {
    const target = event.target as HTMLElement
    const events = [...this.eventList.keys()]
      .map((eventName) => idAndEventFromString(eventName)[0])
      .filter(onlyUnique)
    const hasButton = target.closest(`[role="button"]`)
    const closest = events.map((id) => target.closest(`#${id}`)).filter(Boolean)
    if (!closest || !closest.length || hasButton)
      this.emit(CONSTS.EVENTS.HIDE_ALL, event)
  }

  constructor() {
    this.addEvents()
  }

  addEvents = () => {
    if (canUseDOM) {
      window.addEventListener('contextmenu', this.contextMenuEvent, {
        passive: false
      })
      window.addEventListener('click', this.clickEvent)
    }
    return () => {
      if (canUseDOM) {
        window.removeEventListener('contextmenu', this.contextMenuEvent)
        window.removeEventListener('click', this.clickEvent)
      }
    }
  }

  on = (event: EventType, callBack: Handler) => {
    if (!this.eventList.get(event)) {
      this.eventList.set(event, callBack)
    }
    return this
  }

  off = (event: EventType) => {
    if (this.eventList.get(event)) this.eventList.delete(event)
    return this
  }

  emit = (event: EventType, MouseEvent: MouseEvent) => {
    if (event === CONSTS.EVENTS.HIDE_ALL) {
      this.eventList.forEach((elem, index) => {
        if (index.includes('.hide')) elem(MouseEvent)
      })
      return this
    }
    if (event && this.eventList.get(event)) {
      MouseEvent.preventDefault()
      this.eventList.get(event)(MouseEvent)
    }
    return this
  }
}

export default new EventManager()
