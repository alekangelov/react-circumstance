import React, { HTMLProps } from 'react'
import CLASSNAMES from '../../styles'
import mergeProps from '../../lib/mergeProps'
import withType, { WithType } from '../hoc/withType'
import { CIRCUMSTANCE_TYPES } from '../../lib/__consts'

interface Props extends HTMLProps<HTMLDivElement>, WithType {}

function Divider({ __TYPE, ...rest }: Props) {
  return <div {...mergeProps(rest, { className: CLASSNAMES.Divider })} />
}
export default withType(Divider, CIRCUMSTANCE_TYPES.CIRCUMSTANCE_DIVIDER)
