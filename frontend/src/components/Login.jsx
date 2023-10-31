import React from 'react';

function Login({ onLogin }) {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  function handleSubmit(e) {
    e.preventDefault();
    if (!email || !password) {
      return;
    }
    // authorisation
    onLogin({ email, password }).catch((err) =>
      console.log(`Login error:${err}`)
    );
  }
  return (
    <div className='login'>
      <h2 className='login__title'>Войти</h2>
      <form className='login__form' onSubmit={handleSubmit}>
        <input
          required
          id='email'
          name='email'
          type='text'
          placeholder='Email'
          className='login__input login__input_type_email'
          value={email}
          onChange={({ target }) => setEmail(target.value)}
        />
        <span className='login__error'></span>
        <input
          required
          id='password'
          name='password'
          type='password'
          placeholder='Пароль'
          className='login__input login__input_type_password'
          value={password}
          onChange={({ target }) => setPassword(target.value)}
        />
        <span className='login__error'></span>
        <button type='submit' className='login__button'>
          Войти
        </button>
      </form>
    </div>
  );
}

export default Login;
