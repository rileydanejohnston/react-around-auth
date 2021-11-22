import React from 'react'

export default function PopupWithForm(props) {

  // add hook for if user presses esc while popup is open?

  return (
    <div className={props.isOpen ? `popup popup_active popup_type_${props.name}`: `popup popup_type_${props.name}`}>
      <div className='popup__container'>
        <button className='popup__close' type='button' onClick={props.onClose}></button>
        <form className='popup__form' id={props.name} method='POST' name={props.name}>
          <h3 className='popup__title popup__title_confirm'>{props.title}</h3>
          {props.children}
          <button className='popup__submit popup__submit_confirm' type='submit' name='submit'>Yes</button>
        </form>
      </div>
    </div>
  )
}
