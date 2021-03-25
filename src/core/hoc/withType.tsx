import React from 'react'
import { CIRCUMSTANCE_TYPES } from '../../lib/__consts'
// import { Subtract } from 'utility-types'

export interface WithType {
  __TYPE?: CIRCUMSTANCE_TYPES
}
//
// const withType = <P, CIRCUMSTANCE_TYPES>(
//   WrappedComponent: ComponentType<P>,
//   type: CIRCUMSTANCE_TYPES = CIRCUMSTANCE_TYPES.CIRCUMSTANCE_DEFAULT
// ) => {
//   return class extends Component<P & any, any> {
//     render() {
//       return <WrappedComponent {...{ ...(this.props as P), __TYPE: type }} />
//     }
//   }
// }

const withType = <P extends WithType>(
  WrappedComponent: React.ComponentType<P>,
  __TYPE: CIRCUMSTANCE_TYPES
) => {
  WrappedComponent.defaultProps = {
    __TYPE: __TYPE as any
  }
  return WrappedComponent
}

export default withType
