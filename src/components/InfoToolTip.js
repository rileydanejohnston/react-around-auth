import React from 'react'
import successImg from '../images/success.svg';
import failImg from '../images/fail.svg';

export default function InfoToolTip({ isOpen, onClose, registerStatus }) {

  const successText = 'Success! You have now been registered.';
  const failText = 'Oops, something went wrong! Please try again.';

  return (
    <div className={isOpen ? `popup popup_active`: `popup`}>
      <div className='popup__container popup__container_register'>
        <button className='popup__close' type='button' onClick={onClose}></button>
        <img className='popup__register-img' src={registerStatus ? `${successImg}` : `${failImg}`} alt='Register outcome symbol' />
        <p className='popup__tool-tip'>{registerStatus ? successText : failText}</p>
      </div>
    </div>
  )
}
