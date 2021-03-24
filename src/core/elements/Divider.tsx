import React, { HTMLProps } from 'react'
import CLASSNAMES from '../../styles'
import mergeProps from '../../lib/mergeProps'

export default function Divider(props: HTMLProps<HTMLDivElement>) {
  return <div {...mergeProps(props, { className: CLASSNAMES.Divider })} />
}
