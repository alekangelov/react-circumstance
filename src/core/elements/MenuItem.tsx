import React, { ReactNode } from 'react'
import CLASSNAMES from '../../styles'
import mergeProps from '../../lib/mergeProps'

type ButtonProps = React.DetailedHTMLProps<
  React.HTMLAttributes<Element>,
  Element
>
interface MenuProps extends ButtonProps {
  icon?: ReactNode
}

const MenuItem: React.FC<MenuProps> = ({ children, icon, ...rest }) => {
  const props: ButtonProps = {
    className: CLASSNAMES.MenuItem,
    ...(typeof rest.onClick === 'function' ? { role: 'button' } : {}),
    ...(typeof rest.onClick === 'function' ? { tabIndex: -1 } : {})
  }
  return (
    <div {...mergeProps(props, rest)}>
      <div className={CLASSNAMES.MenuIcon}>{icon}</div>
      <div className={CLASSNAMES.MenuItemInner}>{children}</div>
      <div className={CLASSNAMES.MenuIcon}></div>
    </div>
  )
}
export default MenuItem
