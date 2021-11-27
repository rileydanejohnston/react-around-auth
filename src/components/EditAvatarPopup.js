import React from 'react'
import PopupWithForm from './PopupWithForm'

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar }) {

  const avatarRef = React.useRef('');

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateAvatar(avatarRef.current.value);
  }

  return (
    <PopupWithForm title='Change profile picture' name='avatar' isOpen={isOpen} onSubmit={handleSubmit} onClose={onClose}>
      <input className='popup__about popup__about_profile-pic popup__input' ref={avatarRef}  id='profile-pic-url' type='url' placeholder='Image link' name='pic' required />
      <span className='popup__error' id='profile-pic-url-error' />
    </PopupWithForm>
  )
}

export default EditAvatarPopup
