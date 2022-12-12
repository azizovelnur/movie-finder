import React from 'react'
import HeaderS from './Header.module.scss'
import {ReactComponent as Logo} from '../../assets/movie-icon.svg'
import Search from "../Search/Search"
import {Link, NavLink, useLocation} from "react-router-dom";

const Header = () => {

  const locationPath = useLocation()

  return (
    <header className={HeaderS.header}>

      <div className={'container'}>
        <div className={HeaderS.header__wrapper}>
          <div className={HeaderS.logo}>
            <Link className={HeaderS.logo__link} to={'/'}>
              <Logo className={HeaderS.logo__image} width={80} height={80}/>
            </Link>
            <h2 className={'logo__title'}>Movie Finder</h2>
          </div>

          {
            (locationPath.pathname === '/') && <Search/>
          }

          <nav className={'menu'}>
            <ul className={HeaderS.menu__items}>
              {/*<Link to={'/'}>*/}
              {/*  <li className={HeaderS.menu__item}>Home</li>*/}
              {/*</Link>*/}
              {/*<Link to={'watchlist'}>*/}
              {/*  <li className={HeaderS.menu__item}>Watchlist</li>*/}
              {/*</Link>*/}

              <NavLink
                to={'/'}
                className={(navData) => (navData.isActive ? HeaderS.active : HeaderS.menu__item)}>
                Home
              </NavLink>
              <NavLink
                to={'watchlist'}
                className={(navData) => (navData.isActive ? HeaderS.active : HeaderS.menu__item)}>
                Watchlist
              </NavLink>
            </ul>
          </nav>
        </div>
      </div>

    </header>
  )
}

export default Header