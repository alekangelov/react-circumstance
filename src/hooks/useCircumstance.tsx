import { MouseEvent, useRef, useEffect, useCallback } from 'react'
import { useCircumstanceContext } from '../global/CircumstanceProvider'
import makeId from '../lib/makeId'
import eventManager from '../core/eventManager'
import CONSTS from '../lib/__consts'

type BindTrigger = () => {
  [p: string]: ((ref: any) => any) | string
  ref: (ref: any) => any
}

type BindMenu = () => { [p: string]: string; id: string }

function useCircumstance(): [BindTrigger, BindMenu] {
  const { pushStance, removeStance } = useCircumstanceContext()
  const id = useRef(makeId())
  const circleRef = useRef(null)
  const callBackShow = useCallback((e: MouseEvent) => {
    e.preventDefault()
    console.log(e)
    pushStance({
      id: id.current,
      mousePosition: { x: e.pageX, y: e.pageY }
    })
  }, [])
  const callBackHide = useCallback(() => {
    removeStance()
  }, [])
  useEffect(() => {
    eventManager
      .on(CONSTS.EVENTS.SHOW_MENU(id.current), callBackShow)
      .on(CONSTS.EVENTS.HIDE_MENU(id.current), callBackHide)

    return () => {
      eventManager
        .off(CONSTS.EVENTS.SHOW_MENU(id.current))
        .off(CONSTS.EVENTS.HIDE_MENU(id.current))
    }
  })
  return [
    function () {
      return {
        ref: (ref: any) => (circleRef.current = ref),
        [CONSTS.IDS.ID]: id.current
      }
    },
    function () {
      return {
        [CONSTS.IDS.MENU]: id.current,
        id: id.current
      }
    }
  ]
}

export default useCircumstance
