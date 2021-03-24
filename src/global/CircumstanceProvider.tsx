import React from 'react'
import CLASSNAMES from '../styles'
import CONSTS from '../lib/__consts'

export interface MousePosition {
  x: number
  y: number
}

interface CurrentMenu {
  id?: string
  mousePosition: MousePosition
}

const defaultMenu: CurrentMenu = {
  id: undefined,
  mousePosition: { x: 0, y: 0 }
}

interface CircumstanceProps {
  pushStance: (props: CurrentMenu) => void
  removeStance: () => void
  currentMenu: CurrentMenu
}

const CircumstanceContext = React.createContext<CircumstanceProps>({
  pushStance: () => {},
  removeStance: () => {},
  currentMenu: defaultMenu
})

export const useCircumstanceContext = () =>
  React.useContext(CircumstanceContext)

const CircumstanceProvider: React.FC<any> = ({ children }) => {
  const [currentMenu, setCurrentMenu] = React.useState(defaultMenu)
  const pushStance: CircumstanceProps['pushStance'] = (props) => {
    setCurrentMenu(props)
  }
  const removeStance: CircumstanceProps['removeStance'] = () => {
    setCurrentMenu(defaultMenu)
  }
  return (
    <CircumstanceContext.Provider
      value={{ pushStance, removeStance, currentMenu }}
    >
      <div
        id={CONSTS.PROVIDER_ID}
        className={CLASSNAMES.CircumstanceProvider}
      />
      {children}
    </CircumstanceContext.Provider>
  )
}
export default CircumstanceProvider
