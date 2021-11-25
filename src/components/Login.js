import React from 'react'

export default function Login({ onSignIn }) {

  const [email,setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSignIn(email, password);
  }

  return (
    <div className='auth'>
      <h3 className='auth__title'>Log in</h3>
      <form className='auth__form' onSubmit={handleSubmit} method='POST' name='login'>
        <input className='auth__input' onChange={(e) => setEmail(e.target.value)} placeholder='Email' type='email' name='email' required/>
        <input className='auth__input' onChange={(e) => setPassword(e.target.value)} placeholder='Password' type='password' name='password' required />
        <button className='auth__submit' type='submit'>Log in</button>
        <p className='auth__redirect'>Not a member yet? Sign up <a className='auth__link' href='/register'>here!</a>
        </p>
      </form>
    </div>
  )
}
