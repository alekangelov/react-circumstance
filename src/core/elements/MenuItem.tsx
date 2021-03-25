import React, { Children, useCallback, useState } from 'react'
import CLASSNAMES from '../../styles'
import mergeProps from '../../lib/mergeProps'
import { CIRCUMSTANCE_TYPES } from '../../lib/__consts'
// import { hasOwnProperty } from '../../lib/helpers'
import withType, { WithType } from '../hoc/withType'
import { hasOwnProperty } from '../../lib/helpers'
import ArrowIcon from '../../styles/ArrowIcon'

type ButtonProps = React.DetailedHTMLProps<
  React.HTMLAttributes<Element>,
  Element
>
interface MenuItemProps extends ButtonProps, WithType {
  icon?: React.ReactNode
}

function separateChildrenFromMenu(children: React.ReactNode) {
  const subMenu: React.ReactNodeArray = []
  const otherChildren: React.ReactNodeArray = []
  Children.toArray(children).forEach((child) => {
    if (
      hasOwnProperty(child, 'props') &&
      child.props.__TYPE === CIRCUMSTANCE_TYPES.CIRCUMSTANCE_SUBMENU
    ) {
      return subMenu.push(child)
    }

    return otherChildren.push(child)
  })
  return { otherChildren, subMenu }
}

const MenuItem: React.FC<MenuItemProps> = ({
  __TYPE,
  children,
  icon,
  ...rest
}) => {
  const { otherChildren, subMenu } = separateChildrenFromMenu(children)
  const [subMenuState, showSubMenu] = useState<boolean>(false)
  const onMouseEnter = useCallback((e: React.MouseEvent) => {
    e.preventDefault()
    showSubMenu(true)
  }, [])
  const onMouseLeave = useCallback((e: React.MouseEvent) => {
    e.preventDefault()
    showSubMenu(false)
  }, [])
  const props: ButtonProps = {
    className: CLASSNAMES.MenuItem,
    ...(typeof rest.onClick === 'function' ? { role: 'button' } : {}),
    ...(subMenu.length ? { onMouseEnter, onMouseLeave } : {})
  }
  return (
    <div {...mergeProps(props, rest)}>
      <div className={CLASSNAMES.MenuIcon}>{icon}</div>
      <div className={CLASSNAMES.MenuItemInner}>{otherChildren}</div>
      <div className={CLASSNAMES.MenuIcon}>
        {Boolean(subMenu.length) && (
          <ArrowIcon className={CLASSNAMES.ArrowIcon} />
        )}
      </div>
      {subMenuState &&
        React.cloneElement(subMenu[0] as React.ReactElement, {
          show: subMenuState
        })}
    </div>
  )
}

// if (process.env.NODE_ENV !== 'production')
//   (MenuItem as any).whyDidYouRender = true

export default withType(MenuItem, CIRCUMSTANCE_TYPES.CIRCUMSTANCE_MENUITEM)
