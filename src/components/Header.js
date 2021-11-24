import React from 'react'
import { useLocation } from 'react-router'

export default function Header({ loggedIn, userEmail, logout }) {
  let location = useLocation();

  const [menuOpen, setMenuOpen] = React.useState(false);

  {/* so sorry about this unholy frankenstein of modifiers */}

  return (
    <header className={loggedIn ? 'header header_logged-in' : 'header'}>
      <header className='header__menu-wrapper'>
        <div className='logo'/>
        {loggedIn && <button className={menuOpen ? `header__button header__button_close` : `header__button header__button_menu`} onClick={() => setMenuOpen(!menuOpen)}/>}
      </header>
      {
        (location.pathname === '/login') && <a className='header__text header__text_link header__text_auth' href='/register'>Sign up</a>
      }
      {
        (location.pathname === '/register') && <a className='header__text header__text_link header__text_auth' href='/login'>Log in</a>}
      {
        (loggedIn && location.pathname === '/') && 
        <div className={menuOpen ? 'header__nav header__nav_active' : 'header__nav'}>
          <p className='header__text header__text_email'>{userEmail}</p>
          <a className='header__text header__text_link header__text_log-out' onClick={logout} href='/login'>Log out</a>
        </div>
      }
    </header>
  )
}
