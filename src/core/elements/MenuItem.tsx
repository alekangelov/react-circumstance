import React, { Children, ReactNode, ReactNodeArray } from 'react'
import CLASSNAMES from '../../styles'
import mergeProps from '../../lib/mergeProps'
import { CIRCUMSTANCE_TYPES } from '../../lib/__consts'
import { hasOwnProperty } from '../../lib/helpers'
import withType from '../hoc/withType'

type ButtonProps = React.DetailedHTMLProps<
  React.HTMLAttributes<Element>,
  Element
>
interface MenuItemProps extends ButtonProps {
  icon?: ReactNode
  __TYPE: CIRCUMSTANCE_TYPES
}
function separateChildrenFromMenu(children: ReactNode) {
  const subMenu: ReactNodeArray = []
  const otherChildren: ReactNodeArray = []
  Children.toArray(children).forEach((child) => {
    if (typeof child === 'object') {
      console.log(hasOwnProperty(child, 'props') && child.props)
    }
    return otherChildren.push(child)
  })
  return { otherChildren, subMenu }
}

const MenuItem: React.FC<MenuItemProps> = ({ children, icon, ...rest }) => {
  const props: ButtonProps = {
    className: CLASSNAMES.MenuItem,
    ...(typeof rest.onClick === 'function' ? { role: 'button' } : {}),
    ...(typeof rest.onClick === 'function' ? { tabIndex: -1 } : {})
  }
  separateChildrenFromMenu(children)
  return (
    <div {...mergeProps(props, rest)}>
      <div className={CLASSNAMES.MenuIcon}>{icon}</div>
      <div className={CLASSNAMES.MenuItemInner}>{children}</div>
      <div className={CLASSNAMES.MenuIcon}></div>
    </div>
  )
}

export default withType(MenuItem, CIRCUMSTANCE_TYPES.CIRCUMSTANCE_MENUITEM)
