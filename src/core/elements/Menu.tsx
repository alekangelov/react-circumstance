import React, { CSSProperties, useRef, useState } from 'react'
import { getMenuPosition, portalToRoot } from '../../lib/helpers'
// import withRenderBuffer from '../hoc/withRenderBuffer'
import { useCircumstanceContext } from '../../global/CircumstanceProvider'
import { useDeepCompareEffect } from '../../hooks/useDeepCompare'
import CLASSNAMES from '../../styles'
import mergeProps from '../../lib/mergeProps'

interface MenuProps
  extends React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLElement>,
    HTMLElement
  > {
  id: string
}

const Menu: React.FC<MenuProps> = ({ id, children, ...rest }) => {
  const { currentMenu } = useCircumstanceContext()
  const [coordinates, setCoordinates] = useState<CSSProperties>({})
  const ref = useRef<HTMLDivElement>(null)
  const props = {
    'aria-label': 'menu',
    tabIndex: -1,
    className: CLASSNAMES.Menu,
    style: coordinates,
    ref: ref,
    id: id
  }
  useDeepCompareEffect(() => {
    if (ref.current) {
      setCoordinates(
        getMenuPosition({
          ...currentMenu.mousePosition,
          ref
        })
      )
    }
  }, [currentMenu])
  if (currentMenu.id !== id) return null
  return portalToRoot(<nav {...mergeProps(props, rest)}>{children}</nav>, id)
}

export default Menu
