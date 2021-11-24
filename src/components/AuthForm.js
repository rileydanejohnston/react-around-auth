import React from 'react'

export default function AuthForm({ text, onSubmit }) {

  const [email,setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    onSubmit(email, password);
    // console.log(`Email: ${email}`);
    // console.log(`Password: ${password}`);
  }

  return (
    <div className='auth'>
      <h3 className='auth__title'>{text.title}</h3>
      <form className='auth__form' onSubmit={handleSubmit} method='POST' name={text.formName}>
        <input className='auth__input' onChange={(e) => setEmail(e.target.value)} placeholder='Email' type='email' name='email' required/>
        <input className='auth__input' onChange={(e) => setPassword(e.target.value)} placeholder='Password' type='password' name='password' required />
        <button className='auth__submit' type='submit'>{text.title}</button>
        <p className='auth__redirect'>{text.redirect} <a className='auth__link' href='/'>here!</a>
        </p>
      </form>
    </div>
  )
}
