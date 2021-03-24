import React, { HTMLProps } from 'react'
import CLASSNAMES from '../../styles'
import mergeProps from '../../lib/mergeProps'
import withType from '../hoc/withType'
import { CIRCUMSTANCE_TYPES } from '../../lib/__consts'

function Divider(props: HTMLProps<HTMLDivElement>) {
  return <div {...mergeProps(props, { className: CLASSNAMES.Divider })} />
}
export default withType(Divider, CIRCUMSTANCE_TYPES.CIRCUMSTANCE_DIVIDER)
