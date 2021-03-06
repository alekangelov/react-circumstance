import { CSSProperties, ReactNode, RefObject } from 'react'
import ReactDOM from 'react-dom'
import CONSTS from './__consts'

export const clone = <T extends object>(object: T) => Object.assign({}, object)

export const removeDataFromString = <T extends string>(e: T) =>
  e.replace('data-', '')

export function camelize(str: string) {
  return str
    .replace(/(?:^\w|[A-Z]|\b\w)/g, function (word, index) {
      return index === 0 ? word.toLowerCase() : word.toUpperCase()
    })
    .replace(/\s+/g, '')
    .replace(/-/g, '')
}
export function idAndEventFromString(string: string) {
  if (string.includes('submenu')) {
    const [submenu, id, event] = string.split('.')
    return [id, event, submenu]
  }
  let [id, event] = string.split('.')
  if (!event) event = ''
  return [id, event]
}

export const camelIds = (() => {
  const y = clone(CONSTS.IDS)
  for (const i in y) {
    if ({}.hasOwnProperty.call(y, i)) {
      y[i] = removeDataFromString(y[i])
      y[i] = camelize(y[i])
    }
  }
  return y
})()

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
interface GetSubMenuPosition {
  ref: RefObject<any>
}

const removeEmptyFromObject = (y: { [key: string]: any }) => {
  const x = {}
  for (const key in y) {
    if (y[key]) x[key] = y[key]
  }
  return x
}

const makeCoordinates = (coordinates: {
  left?: number | string | null | undefined
  top?: number | string | null | undefined
  bottom?: number | string | null | undefined
  right?: number | string | null | undefined
}) => {
  const x = removeEmptyFromObject(coordinates)
  for (const key in x) {
    if (typeof x[key] === 'number') x[key] = `${x[key]}%`
  }
  return x
}

export const truthReduce = <
  T extends Array<any>,
  B extends (
    previousValue: any,
    currentValue: any,
    currentIndex: number,
    array: any[]
  ) => any
>(
  element: T,
  cb: B
) => element.reduce(cb, true)

export function getSubMenuPosition({ ref }: GetSubMenuPosition): CSSProperties {
  const coordinates = {
    left: 100 as number | string | null | undefined,
    top: 0 as number | string | null | undefined,
    bottom: 0 as number | string | null | undefined,
    right: 0 as number | string | null | undefined
  }
  if (!ref.current) return makeCoordinates(coordinates)
  const { innerWidth, innerHeight } = window
  const rect = ref.current.getBoundingClientRect()
  if (rect.top + rect.height > innerHeight) {
    coordinates.bottom = '0%'
  }
  if (rect.left + rect.width > innerWidth) {
    coordinates.left = null
    coordinates.right = 100
  }

  return makeCoordinates(coordinates)
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
    typeof x === 'object' &&
    x != null &&
    typeof y === 'object' &&
    y != null
  ) {
    if (Object.keys(x).length !== Object.keys(y).length) return false

    for (const prop in x) {
      if (
        prop &&
        {}.hasOwnProperty.call(x, prop) &&
        {}.hasOwnProperty.call(y, prop)
      ) {
        if (!deepEqual(x[prop], y[prop])) return false
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

export function hasOwnProperty<X extends {}, Y extends PropertyKey>(
  obj: X,
  prop: Y
): obj is X & Record<Y, unknown> {
  return Object.prototype.hasOwnProperty.call(obj, prop)
}

export function doNothingWith(something: any) {
  return something
}
