import React, { Component, ComponentType } from 'react'
import CONSTS from '../../lib/__consts'

export default function withRenderBuffer(WrappedComponent: ComponentType) {
  return class WithRenderBuffer extends Component<any> {
    state = {
      canRender: false
    }
    constructor(props: any) {
      super(props)
    }
    componentDidMount() {
      setTimeout(() => this.setState({ canRender: true }), CONSTS.RENDER_BUFFER)
    }

    render() {
      if (this.state.canRender) return <WrappedComponent {...this.props} />
      return null
    }
  }
}
