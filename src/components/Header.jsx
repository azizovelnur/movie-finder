import React from 'react'
// import HeaderS from './Header.module.scss'
import {ReactComponent as Logo} from '../assets/movie-icon.svg'
import Search from "./Search/Search"
import {Link, NavLink, useLocation} from "react-router-dom";

const Header = () => {

  const locationPath = useLocation()

  return (
    <header className={'z-50 fixed w-full mb-[200px] text-[16px] bg-[#141414] text-[#fff]'}>

      <div className={'container mx-auto max-w-[1200px]'}>
        <div className={'flex justify-between items-center h-[70px]'}>
          <Link to={'/'}>
            <div className={'flex items-center'}>
              <Logo className={'animate-[spin_7s_linear_infinite] fill-indigo-500'} width={80} height={80}/>
              <h2 className={'font-black text-[20px]'}>Movie Finder</h2>
            </div>
          </Link>

          {
            (locationPath.pathname === '/') && <Search/>
          }

          <nav>
            <ul className={'flex justify-between'}>
              <NavLink
                to={'/'}
                className={(navData) =>
                  (navData.isActive ? 'opacity-100 ml-[20px]' : 'opacity-70 ml-[20px]')
                }>
                Home
              </NavLink>
              <NavLink
                to={'watchlist'}
                className={(navData) =>
                  (navData.isActive ? 'opacity-100 ml-[20px]' : 'opacity-70 ml-[20px]')}>
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