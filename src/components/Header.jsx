import React, {useState} from 'react'
import {ReactComponent as Logo} from '../assets/icons/movie-icon.svg'
import {ReactComponent as MenuBurger} from '../assets/icons/header-menu-burger.svg'
import {ReactComponent as CloseMenuBurger} from '../assets/icons/close-player.svg'
import { Search } from "./Search/Search"
import {Link, NavLink, useLocation} from "react-router-dom";

export const Header = () => {

  const [openMenu, setOpenMenu] = useState(false)

  const locationPath = useLocation()


  const PopupMenu = () => {
    return (
      <div className={'md:hidden fixed w-full h-full z-50 top-[100px] bg-[#141414] text-white text-[32px]'}>
            <ul className={'flex flex-col items-center justify-between'}>
              <NavLink
                onClick={() => setOpenMenu(false)}
                to={'/'}
                className={(navData) =>
                  (navData.isActive ? 'opacity-100 mx-[10px]' : 'opacity-70 mx-[10px]')
                }>
                Home
              </NavLink>
              <NavLink
                onClick={() => setOpenMenu(false)}
                to={'watchlist'}
                className={(navData) =>
                  (navData.isActive ? 'opacity-100 mx-[10px]' : 'opacity-70 mx-[10px]')}>
                Watchlist
              </NavLink>

            </ul>
      </div>
    )
  }



  return (
    <header className={'z-10 fixed w-full mb-[200px] text-[16px] bg-[#141414] text-[#fff]'}>

      <div className={'container mx-auto max-w-[1200px]'}>
        <div className={'md:flex md:justify-between md:flex-row md:items-center md:h-[70px] flex flex-col items-center justify-between h-[100px] relative'}>
          <Link to={'/'}>
            <div className={'flex items-center'}>
              <Logo className={'md:h-[60px] animate-[spin_7s_linear_infinite] fill-indigo-500 h-[40px]'}/>
              <h2 className={'md:text-[22px] font-black text-[16px]'}>Movie Finder</h2>
            </div>
          </Link>

          {
            (locationPath.pathname === '/' && openMenu === false) && <Search/>
          }

           <button onClick={() => setOpenMenu(!openMenu)} className={'md:hidden block w-[30px] h-[30px] absolute top-[8px] right-[8px]'}>{openMenu === true ? <CloseMenuBurger className={'fill-white h-[30px] w-[30px]'}/> : <MenuBurger/>}</button>

          {openMenu && <PopupMenu/>}

          {/*<button className={'md:hidden block w-[30px] h-[30px] absolute top-[8px] right-[8px]'}><CloseMenuBurger/></button>*/}

          <nav className={'md:block hidden'}>
            <ul className={'flex justify-between'}>
              <NavLink
                to={'/'}
                className={(navData) =>
                  (navData.isActive ? 'opacity-100 mx-[10px]' : 'opacity-70 mx-[10px]')
                }>
                Home
              </NavLink>
              <NavLink
                to={'watchlist'}
                className={(navData) =>
                  (navData.isActive ? 'opacity-100 mx-[10px]' : 'opacity-70 mx-[10px]')}>
                Watchlist
              </NavLink>

            </ul>
          </nav>

        </div>
      </div>

    </header>
  )
}
