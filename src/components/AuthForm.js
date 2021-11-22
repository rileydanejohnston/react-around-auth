import React from 'react'

export default function AuthForm({ text }) {

  const [email,setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(`Email: ${email}`);
    console.log(`Password: ${password}`);
  }

  return (
    <div className='login' onSubmit={handleSubmit}>
      <h3 className='login__title'>{text.title}</h3>
      <form className='login__form' method='POST' name={text.formName}>
        <input className='login__input' onChange={(e) => setEmail(e.target.value)} placeholder='Email' type='email' name='email' required/>
        <input className='login__input' onChange={(e) => setPassword(e.target.value)} placeholder='Password' type='password' name='password' required />
        <button className='login__submit' type='submit'>{text.title}</button>
        <p className='login__redirect'>{text.redirect} <a className='login__link' href='/'>here!</a>
        </p>
      </form>
    </div>
  )
}
