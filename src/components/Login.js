import React from 'react'

export default function Login() {

  const [email,setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(`Email: ${email}`);
    console.log(`Password: ${password}`);
  }

  return (
    <div className='login' onSubmit={handleSubmit}>
      <h3 className='login__title'>Sign up</h3>
      <form className='login__form' method='POST' name='login'>
        <input className='login__input' onChange={(e) => setEmail(e.target.value)} placeholder='Email' type='email' name='email' required/>
        <input className='login__input' onChange={(e) => setPassword(e.target.value)} placeholder='Password' type='password' name='password' required />
        <button className='login__submit' type='submit'>Sign up</button>
        <p className='login__redirect'>Already a member? Log in <a className='login__link' href='www.google.com'>here!</a>
        </p>
      </form>
    </div>
  )
}
