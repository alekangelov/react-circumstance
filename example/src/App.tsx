import React from 'react'

import {
  CircumstanceProvider,
  useCircumstance,
  Menu,
  MenuItem,
  Divider,
  SubMenu
} from 'react-circumstance'
import 'react-circumstance/dist/index.css'

const InnerApp = () => {
  const [bindTrigger, bindMenu] = useCircumstance()
  return (
    <>
      <div {...bindTrigger()} className='clickable'>
        <div>Right Click Me</div>
      </div>
      <Menu {...bindMenu()}>
        <MenuItem
          icon={
            <img
              alt={'i am also an icon'}
              src={require('./assets/tux-batman.webp')}
            />
          }
          onClick={(e) => {
            e.persist()
            console.log(e)
          }}
        >
          Item 1
          <SubMenu>
            <MenuItem>SubMenu 1 Item 1
              <SubMenu>
                <MenuItem>SubMenu 1 Item 1</MenuItem>
                <MenuItem>SubMenu 1 Item 1</MenuItem>
                <MenuItem>SubMenu 1 Item 1</MenuItem>
                <MenuItem>SubMenu 1 Item 1</MenuItem>
                <MenuItem>SubMenu 1 Item 1</MenuItem>
              </SubMenu>
            </MenuItem>
            <MenuItem>SubMenu 1 Item 1</MenuItem>
            <MenuItem>SubMenu 1 Item 1</MenuItem>
            <MenuItem>SubMenu 1 Item 1</MenuItem>
            <MenuItem>SubMenu 1 Item 1</MenuItem>
          </SubMenu>
        </MenuItem>
        <MenuItem
          icon={
            <img
              alt={'i am an icon'}
              src={require('./assets/tux-spiderman.png')}
            />
          }
        >
          Item 2
        </MenuItem>
        <MenuItem>Item 3</MenuItem>
        <Divider />
        <MenuItem>Item 4</MenuItem>
        <MenuItem>Item 5</MenuItem>
        <MenuItem>Item 6</MenuItem>
      </Menu>
    </>
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
