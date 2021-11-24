import React from 'react'
import AuthForm from './AuthForm';

export default function Register({ onRegister }) {

  const registerText = {
    title: 'Sign up',
    formName: 'register',
    redirect: 'Already a member? Log in'
  }

  return (
    <AuthForm text={registerText} onSubmit={onRegister} />
  )
}
