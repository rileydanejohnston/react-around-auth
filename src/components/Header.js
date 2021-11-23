import React from 'react'
import { useLocation } from 'react-router'

export default function Header({ loggedIn }) {
  let location = useLocation();

  return (
    <header className='header'>
      <div className='logo'/>
      {
        (location.pathname === '/login') && <a className='header__link' href='/register'>Sign up</a>
      }
      {
        (location.pathname === '/register') && <a className='header__link' href='/register'>Sign in</a>}
      {
        (loggedIn && location.pathname === '/') && 
        <div className='header__logged-in'>
          <p className='header__email'>email@email.com</p>
          <a className='header__link header__link_log-out' href='/login'>Log out</a>
        </div>
      }
    </header>
  )
}
