import './index.scss'
import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
if (process.env.NODE_ENV !== 'production') {
  const whyDidYouRender = require('@welldone-software/why-did-you-render')
  whyDidYouRender(React, {
    trackAllPureComponents: true,
    trackHooks: true
  })
}
ReactDOM.render(<App />, document.getElementById('root'))
