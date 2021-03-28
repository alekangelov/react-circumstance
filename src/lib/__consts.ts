const CONSTS = {
  PROVIDER_ID: 'react-circumstance-provider',
  EVENTS: {
    HIDE_ALL: 'HIDE_ALL',
    HIDE_ALL_SUBMENUS: 'HIDE_ALL_SUBMENUS',
    HIDE_ALL_SUBMENUS_EXCEPT: (id: string) => `HIDE_ALL_SUBMENUS!${id}`,
    SHOW_SUBMENU: (id: string) => `submenu.${id}.show`,
    HIDE_SUBMENU: (id: string) => `submenu.${id}.hide`,
    SHOW_MENU: (id: string) => `${id}.show`,
    HIDE_MENU: (id: string) => `${id}.hide`
  },
  RENDER_BUFFER: 0,
  IDS: {
    SUBMENU: 'data-circumstance-submenu',
    SUBMENU_ID: 'data-circumstance-submenu-id',
    MENU: 'data-circumstance-menu-id',
    ID: 'data-circumstance-menu'
  }
}

export enum CIRCUMSTANCE_TYPES {
  CIRCUMSTANCE_MENU = 'CIRCUMSTANCE_MENU',
  CIRCUMSTANCE_SUBMENU = 'CIRCUMSTANCE_SUBMENU',
  CIRCUMSTANCE_MENUITEM = 'CIRCUMSTANCE_MENUITEM',
  CIRCUMSTANCE_DIVIDER = 'CIRCUMSTANCE_DIVIDER',
  CIRCUMSTANCE_DEFAULT = 'CIRCUMSTANCE_DEFAULT'
}

export default CONSTS
