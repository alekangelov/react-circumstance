import styles from './styles.module.scss'
import clsx from '../lib/clsx'

function classNameIdentity(name: string) {
  return 'circumstance-' + name
}

export const classNames = {
  Menu: classNameIdentity('menu'),
  MenuItem: classNameIdentity('menu-item'),
  MenuItemInner: classNameIdentity('menu-item__inner'),
  SubMenu: classNameIdentity('sub-menu'),
  MenuIcon: classNameIdentity('menu-icon'),
  ArrowIcon: classNameIdentity('arrow-icon'),
  Divider: classNameIdentity('divider')
}

const CLASSNAMES = {
  Menu: clsx(styles.Menu, classNames.Menu),
  MenuItem: clsx(styles.MenuItem, classNames.MenuItem),
  MenuItemInner: clsx(styles.MenuItemInner, classNames.MenuItemInner),
  SubMenu: clsx(styles.SubMenu, classNames.SubMenu),
  MenuIcon: clsx(styles.MenuIcon, classNames.MenuIcon),
  ArrowIcon: clsx(styles.ArrowIcon, classNames.ArrowIcon),
  CircumstanceProvider: clsx(styles.CircumstanceProvider),
  Divider: clsx(styles.Divider, classNames.Divider)
}

export default CLASSNAMES
