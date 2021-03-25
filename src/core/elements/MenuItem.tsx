import React, { Children, useRef } from 'react'
import CLASSNAMES from '../../styles'
import mergeProps from '../../lib/mergeProps'
import CONSTS, { CIRCUMSTANCE_TYPES } from '../../lib/__consts'
// import { hasOwnProperty } from '../../lib/helpers'
import withType, { WithType } from '../hoc/withType'
import { hasOwnProperty } from '../../lib/helpers'
import ArrowIcon from '../../styles/ArrowIcon'
import makeId from '../../lib/makeId'
import eventManager from '../eventManager'

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
  const subMenuId = useRef(makeId())
  const props = {
    className: CLASSNAMES.MenuItem,
    ...(typeof rest.onClick === 'function' ? { role: 'button' } : {}),
    ...(subMenu.length && { [CONSTS.IDS.SUBMENU_ID]: subMenuId.current }),
    onMouseOver: (e: React.MouseEvent) => {
      const event = (e as unknown) as MouseEvent
      eventManager
        .emit(CONSTS.EVENTS.HIDE_ALL_SUBMENUS, event)
        .emit(CONSTS.EVENTS.SHOW_SUBMENU(subMenuId.current), event)
    }
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
      {Boolean(subMenu.length) &&
        Boolean((subMenu as React.ReactElement[])[0]) &&
        React.cloneElement((subMenu as React.ReactElement[])[0], {
          id: subMenuId.current
        })}
    </div>
  )
}

// if (process.env.NODE_ENV !== 'production')
//   (MenuItem as any).whyDidYouRender = true

export default withType(MenuItem, CIRCUMSTANCE_TYPES.CIRCUMSTANCE_MENUITEM)
