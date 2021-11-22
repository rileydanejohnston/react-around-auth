import React from 'react'
import AuthForm from './AuthForm';

export default function Login() {

  const logInText = {
    title: 'Log in',
    formName: 'login',
    redirect: 'Not a member yet? Sign up'
  }

  return (
    <AuthForm text={logInText} />
  )
}
