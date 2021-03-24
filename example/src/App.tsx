import React from 'react'

import {
  CircumstanceProvider,
  useCircumstance,
  Menu,
  MenuItem,
  Divider
} from 'react-circumstance'
import 'react-circumstance/dist/index.css'

const InnerApp = () => {
  const [bindTrigger, bindMenu] = useCircumstance()
  return (
    <div {...bindTrigger()} className='clickable'>
      <div>Click Me</div>
      <Menu {...bindMenu()}>
        <MenuItem>Item 1</MenuItem>
        <MenuItem>Item 2</MenuItem>
        <MenuItem>Item 3</MenuItem>
        <Divider />
        <MenuItem>Item 4</MenuItem>
        <MenuItem>Item 5</MenuItem>
        <MenuItem>Item 6</MenuItem>
      </Menu>
    </div>
  )
}
const App = () => {
  return (
    <CircumstanceProvider>
      <div className={'wrapper'}>
        <InnerApp />
      </div>
    </CircumstanceProvider>
  )
}

export default App
