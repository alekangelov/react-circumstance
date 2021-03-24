import React, { useRef } from 'react'
import { getMenuPosition, portalToRoot } from '../../lib/helpers'
// import withRenderBuffer from '../hoc/withRenderBuffer'
import { useCircumstanceContext } from '../../global/CircumstanceProvider'
// import { useDeepCompareEffect } from '../../hooks/useDeepCompare'
import CLASSNAMES from '../../styles'
import mergeProps from '../../lib/mergeProps'
import { CIRCUMSTANCE_TYPES } from '../../lib/__consts'
import withType from '../hoc/withType'

// import useRefState from '../../hooks/useRefState'

interface MenuProps
  extends React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLElement>,
    HTMLElement
  > {
  id: string
  __TYPE?: CIRCUMSTANCE_TYPES
}

const Menu: React.FC<MenuProps> = ({ id, children, ...rest }) => {
  const { currentMenu } = useCircumstanceContext()
  // const [coordinates, setCoordinates] = useRefState<CSSProperties>({})
  const ref = useRef<HTMLDivElement>(null)
  const style = getMenuPosition({
    ...currentMenu.mousePosition,
    ref
  })
  const props = {
    'aria-label': 'menu',
    tabIndex: -1,
    className: CLASSNAMES.Menu,
    style,
    ref: ref,
    id: id
  }
  if (currentMenu.id !== id) {
    return null
  }
  return portalToRoot(<nav {...mergeProps(props, rest)}>{children}</nav>, id)
}

if (process.env.NODE_ENV !== 'production') (Menu as any).whyDidYouRender = true

export default withType(Menu, CIRCUMSTANCE_TYPES.CIRCUMSTANCE_MENU)
