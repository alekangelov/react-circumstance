import React, { useEffect, useRef, useState } from 'react'
import withType, { WithType } from '../hoc/withType'
// import { CIRCUMSTANCE_TYPES } from '../../lib/__consts'
import mergeProps from '../../lib/mergeProps'
import CONSTS, { CIRCUMSTANCE_TYPES } from '../../lib/__consts'
import CLASSNAMES from '../../styles'
import { getSubMenuPosition } from '../../lib/helpers'
import eventManager from '../eventManager'

interface SubMenuProps
  extends React.DetailedHTMLProps<React.HTMLAttributes<Element>, Element>,
    WithType {}

const SubMenu: React.FC<SubMenuProps> = ({ __TYPE, id, children, ...rest }) => {
  const ref = useRef<HTMLElement | null>(null)
  const [show, setShow] = useState<boolean>(false)
  const style = {
    ...getSubMenuPosition({ ref }),
    ...(show ? {} : { display: 'none' })
  }
  const props = {
    className: CLASSNAMES.SubMenu,
    [CONSTS.IDS.SUBMENU]: id,
    style
  }
  useEffect(() => {
    if (id) {
      eventManager
        .on(CONSTS.EVENTS.SHOW_SUBMENU(id), () => {
          setShow(true)
        })
        .on(CONSTS.EVENTS.HIDE_SUBMENU(id), () => {
          setShow(false)
        })
    }
    return () => {
      if (id) {
        eventManager
          .off(CONSTS.EVENTS.SHOW_SUBMENU(id))
          .off(CONSTS.EVENTS.HIDE_SUBMENU(id))
      }
    }
  })
  return (
    <div {...mergeProps(rest, props)} ref={(e) => (ref.current = e)}>
      {children}
    </div>
  )
}

export default withType(SubMenu, CIRCUMSTANCE_TYPES.CIRCUMSTANCE_SUBMENU)
