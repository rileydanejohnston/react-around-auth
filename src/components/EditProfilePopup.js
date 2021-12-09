import React from 'react'
import CurrentUserContext from '../contexts/CurrentUserContext';
import PopupWithForm from './PopupWithForm';

function EditProfilePopup(props) {

  const [name, setName] = React.useState('');
  const [description, setDescription] = React.useState('');

  const currentUser = React.useContext(CurrentUserContext);

  React.useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, props.isOpen]);

  function handleNameChange(e) {
    setName(e.target.value);
  }

  function handleDescriptionChange(e) {
    setDescription(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    props.setIsSaving(true);
    props.onUpdateUser({
      name,
      about: description
    });
  }

  return (
    <PopupWithForm
      title='Edit profile'
      name='profile'
      buttonText='Save'
      onSubmit={handleSubmit}
      isOpen={props.isOpen}
      onClose={props.onClose}
      isSaving={props.isSaving}
    >
      <input className='popup__name popup__input' onChange={handleNameChange} value={name} id='profile-name' type='text' placeholder='Name' name='name' minLength='2' maxLength='40' required />
      <span className='popup__error' id='profile-name-error' />
      <input className='popup__about popup__input' onChange={handleDescriptionChange} value={description} id='profile-about' type='text' placeholder='About' name='about' minLength='2' maxLength='200' required />
      <span className='popup__error' id='profile-about-error' />
    </PopupWithForm>
  )
}

export default EditProfilePopup
