import React from 'react'

export default function Register({ onRegister }) {

  const [email,setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onRegister(email, password);
  }

  return (
    <div className='auth'>
      <h3 className='auth__title'>Sign up</h3>
      <form className='auth__form' onSubmit={handleSubmit} method='POST' name='register'>
        <input className='auth__input' onChange={(e) => setEmail(e.target.value)} placeholder='Email' type='email' name='email' required/>
        <input className='auth__input' onChange={(e) => setPassword(e.target.value)} placeholder='Password' type='password' name='password' required />
        <button className='auth__submit' type='submit'>Sign up</button>
        <p className='auth__redirect'>Already a member? Log in <a className='auth__link' href='/login'>here!</a>
        </p>
      </form>
    </div>
  )
}
