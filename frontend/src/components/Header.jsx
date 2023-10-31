import React from 'react';
import logo from '../images/header-logo.svg';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import * as token from '../utils/token.js';

function Header({ userData }) {
  const location = useLocation();
  const navigate = useNavigate();

  function signOut() {
    token.removeToken();
    navigate('/signin');
    
  }

  return (
    <header className='header'>
      <img src={logo} alt='Лого' className='header__logo' />
      <div className='header__container'>
        {location.pathname === '/' && (
          <div className='header__user-email'>{userData.email}</div>
        )}
        <nav className='header__navbar'>
          {location.pathname === '/' && (
            <>
              <button
                className='header__link button header__button'
                onClick={signOut}
              >
                Выйти
              </button>
            </>
          )}
          {location.pathname === '/signup' && (
            <Link className='header__link button ' to='/signin'>
              Войти
            </Link>
          )}
          {location.pathname === '/signin' && (
            <Link className='header__link button ' to='/signup'>
              Регистрация
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
}

export default Header;
