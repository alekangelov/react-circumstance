import { MouseEvent, useRef, useEffect, useCallback } from 'react'
import { useCircumstanceContext } from '../global/CircumstanceProvider'
import makeId from '../lib/makeId'
import eventManager from '../core/eventManager'

type BindTrigger = () => {
  ref: (ref: any) => any
  'data-circumstance-id': string
}
type BindMenu = () => {
  'data-circumstance-menu-id': string
  id: string
}
function useCircumstance(): [BindTrigger, BindMenu] {
  const { pushStance, removeStance } = useCircumstanceContext()
  const id = useRef(makeId())
  const circleRef = useRef(null)
  const callBackShow = useCallback((e: MouseEvent) => {
    e.preventDefault()
    pushStance({
      id: id.current,
      mousePosition: { x: e.pageX, y: e.pageY }
    })
  }, [])
  const callBackHide = useCallback(() => {
    removeStance()
  }, [])
  useEffect(() => {
    eventManager.on(`${id.current}.show`, callBackShow)
    eventManager.on(`${id.current}.hide`, callBackHide)
    return () => {
      eventManager.off(`${id.current}.show`)
      eventManager.off(`${id.current}.hide`)
    }
  })
  return [
    function () {
      return {
        ref: (ref: any) => (circleRef.current = ref),
        'data-circumstance-id': id.current
      }
    },
    function () {
      return {
        'data-circumstance-menu-id': id.current,
        id: id.current
      }
    }
  ]
}

export default useCircumstance
