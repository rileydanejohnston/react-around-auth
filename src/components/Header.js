import React from 'react'
import { useLocation } from 'react-router'

export default function Header({ loggedIn, userEmail, logout }) {
  let location = useLocation();

  const [menuOpen, setMenuOpen] = React.useState(false);

  return (
    <header className='header'>
      <header className='header__menu-wrapper'>
        <div className='logo'/>
        {loggedIn && <button className={menuOpen ? `header__button header__button_close` : `header__button header__button_menu`} onClick={() => setMenuOpen(!menuOpen)}/>}
      </header>
      {
        (location.pathname === '/login') && <a className='header__text header__text_link' href='/register'>Sign up</a>
      }
      {
        (location.pathname === '/register') && <a className='header__text header__text_link' href='/login'>Log in</a>}
      {
        (loggedIn && location.pathname === '/') && 
        <div className={menuOpen ? 'header__logged-in header__logged-in_active' : 'header__logged-in'}>
          <p className='header__text header__text_email'>{userEmail}</p>
          <a className='header__text header__text_link header__text_log-out' onClick={logout} href='/login'>Log out</a>
        </div>
      }
    </header>
  )
}
