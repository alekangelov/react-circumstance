import React from 'react'
import CLASSNAMES from '../../styles'
import mergeProps from '../../lib/mergeProps'
interface MenuProps
  extends React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {}

const MenuItem: React.FC<MenuProps> = ({ children, ...rest }) => {
  const props = { className: CLASSNAMES.MenuItem }
  return <button {...mergeProps(props, rest)}>{children}</button>
}
export default MenuItem
