import { CSSProperties, ReactNode, RefObject } from 'react'
import ReactDOM from 'react-dom'
import CONSTS from './__consts'

export function idAndEventFromString(string: string) {
  let [id, event] = string.split('.')
  if (!event) event = ''
  return [id, event]
}

export function portalToRoot(node: ReactNode, id: string) {
  const parent = document.querySelector(`#${CONSTS.PROVIDER_ID}`) as Element
  if (!parent) throw Error(`Please put <CircumstanceProvider /> at the top!`)
  return ReactDOM.createPortal(node, parent, id)
}

interface GetMenuPosition {
  x: number
  y: number
  ref: RefObject<any>
}

export function getMenuPosition({
  x = 0,
  y = 0,
  ref
}: GetMenuPosition): CSSProperties {
  const coordinates = {
    top: y,
    left: x
  }
  if (!ref.current) return coordinates
  const { innerWidth, innerHeight } = window
  const rect = ref.current.getBoundingClientRect()
  if (y + rect.height > innerHeight) {
    coordinates.top = coordinates.top - rect.height
  }
  if (x + rect.width > innerWidth) {
    coordinates.left = coordinates.left - rect.width
  }
  if (coordinates.top < 0) {
    coordinates.top =
      rect.height < innerHeight ? (innerHeight - rect.height) / 2 : 0
  }
  if (coordinates.left < 0) {
    coordinates.left =
      rect.width < innerWidth ? (innerWidth - rect.width) / 2 : 0
  }
  return coordinates
}

export function deepEqual(x: any, y: any) {
  if (x === y) {
    return true
  } else if (
    typeof x == 'object' &&
    x != null &&
    typeof y == 'object' &&
    y != null
  ) {
    if (Object.keys(x).length != Object.keys(y).length) return false

    for (const prop in x) {
      if (prop && x.hasOwnProperty(prop)) {
        if (y.hasOwnProperty(prop)) {
          if (!deepEqual(x[prop], y[prop])) return false
        }
      } else {
        return false
      }
    }

    return true
  } else return false
}

export function onlyUnique(value: any, index: number, self: any[]) {
  return self.indexOf(value) === index
}
