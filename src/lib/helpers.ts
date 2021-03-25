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
  console.log(rect)
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
  return {}.hasOwnProperty.call(obj, prop)
}

export function doNothingWith(something: any) {
  return something
}
