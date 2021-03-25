import React, { useRef } from 'react'
import withType, { WithType } from '../hoc/withType'
// import { CIRCUMSTANCE_TYPES } from '../../lib/__consts'
import mergeProps from '../../lib/mergeProps'
import { CIRCUMSTANCE_TYPES } from '../../lib/__consts'
import CLASSNAMES from '../../styles'
import { getSubMenuPosition } from '../../lib/helpers'

interface SubMenuProps
  extends React.DetailedHTMLProps<React.HTMLAttributes<Element>, Element>,
    WithType {
  show?: boolean
}

const SubMenu: React.FC<SubMenuProps> = ({
  __TYPE,
  show,
  children,
  ...rest
}) => {
  const ref = useRef<HTMLElement | null>(null)
  const style = {
    ...getSubMenuPosition({ ref }),
    ...(show ? {} : { display: 'none' })
  }
  console.log(ref.current)
  const props = {
    className: CLASSNAMES.SubMenu,
    style
  }
  delete rest.ref
  return (
    <div {...mergeProps(rest, props)} ref={(e) => (ref.current = e)}>
      {children}
    </div>
  )
}

export default withType(SubMenu, CIRCUMSTANCE_TYPES.CIRCUMSTANCE_SUBMENU)
