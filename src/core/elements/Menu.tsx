import React, { useRef } from 'react'
import { getMenuPosition, portalToRoot } from '../../lib/helpers'
// import withRenderBuffer from '../hoc/withRenderBuffer'
import { useCircumstanceContext } from '../../global/CircumstanceProvider'
// import { useDeepCompareEffect } from '../../hooks/useDeepCompare'
import CLASSNAMES from '../../styles'
import mergeProps from '../../lib/mergeProps'
// import useRefState from '../../hooks/useRefState'

interface MenuProps
  extends React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLElement>,
    HTMLElement
  > {
  id: string
}

const Menu: React.FC<MenuProps> = ({ id, children, ...rest }) => {
  const { currentMenu } = useCircumstanceContext()
  // const [coordinates, setCoordinates] = useRefState<CSSProperties>({})
  const ref = useRef<HTMLDivElement>(null)
  const style = getMenuPosition({
    ...currentMenu.mousePosition,
    ref
  })
  console.log(style)
  const props = {
    'aria-label': 'menu',
    tabIndex: -1,
    className: CLASSNAMES.Menu,
    style,
    ref: ref,
    // ...(!coordinates.current.top && !coordinates.current.left
    //   ? { display: 'none' }
    //   : {}),
    id: id
  }
  // console.log(currentMenu)
  // useDeepCompareEffect(() => {
  //   if (ref.current) {
  //     setCoordinates(
  //
  //     )
  //   }
  // }, [currentMenu])
  if (currentMenu.id !== id) {
    return null
  }
  return portalToRoot(<nav {...mergeProps(props, rest)}>{children}</nav>, id)
}

if (process.env.NODE_ENV !== 'production') (Menu as any).whyDidYouRender = true

export default Menu
