import React from 'react'
import { useLocation } from 'react-router'

export default function Header({ loggedIn, userEmail, logout }) {
  let location = useLocation();

  return (
    <header className='header'>
      <div className='logo'/>
      {
        (location.pathname === '/login') && <a className='header__text header__text_link' href='/register'>Sign up</a>
      }
      {
        (location.pathname === '/register') && <a className='header__text header__text_link' href='/login'>Sign in</a>}
      {
        (loggedIn && location.pathname === '/') && 
        <div className='header__logged-in'>
          <p className='header__text header__text_email'>{userEmail}</p>
          <a className='header__text header__text_link header__text_log-out' onClick={logout} href='/login'>Log out</a>
        </div>
      }
    </header>
  )
}
