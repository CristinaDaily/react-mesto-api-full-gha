import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Register({ onRegister }) {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  const navigate = useNavigate();

  function hendleSubmit(e) {
    e.preventDefault();

    //registration
    onRegister({ password, email }).catch((err) => {
      console.log(`Registration error:${err} `);
    });
  }

  return (
    <div className='login'>
      <h2 className='login__title'>Регистрация</h2>
      <form className='login__form' onSubmit={hendleSubmit}>
        <input
          required
          id='email-register'
          name='register-email'
          type='email'
          placeholder='Email'
          className='login__input login__input_type_email'
          value={email}
          onChange={({ target }) => setEmail(target.value)}
        />
        <span className='login__error'></span>
        <input
          required
          id='password-register'
          name='register-password'
          type='password'
          placeholder='Пароль'
          className='login__input login__input_type_password'
          value={password}
          onChange={({ target }) => setPassword(target.value)}
        />
        <span className='login__error'></span>
        <button type='submit' className='login__button'>
          Зарегистрироваться
        </button>
      </form>
      <div className='login__signin'>
        <p className='login__login-question'>Уже зарегистрированы?</p>
        <Link to='/signin' className='login__login-link button '>
          Войти
        </Link>
      </div>
    </div>
  );
}

export default Register;
