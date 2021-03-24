import React, { Component, ComponentType } from 'react'
import { CIRCUMSTANCE_TYPES } from '../../lib/__consts'

interface WithType {
  __TYPE: CIRCUMSTANCE_TYPES
}

const withType = <P extends WithType>(
  WrappedComponent: ComponentType<P>,
  type: CIRCUMSTANCE_TYPES
) => {
  return class extends Component<P & WithType> {
    render() {
      return <WrappedComponent {...{ ...(this.props as P), __TYPE: type }} />
    }
  }
}

export default withType
