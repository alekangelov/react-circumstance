import React from 'react'
import withType from '../hoc/withType'
import { CIRCUMSTANCE_TYPES } from '../../lib/__consts'

const SubMenu: React.FC<{ __TYPE: CIRCUMSTANCE_TYPES }> = ({ children }) => {
  return <div>{children}</div>
}

export default withType(SubMenu, CIRCUMSTANCE_TYPES.CIRCUMSTANCE_SUBMENU)
