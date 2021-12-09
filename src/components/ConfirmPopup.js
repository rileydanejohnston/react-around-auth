import React from 'react'
import PopupWithForm from './PopupWithForm'

export default function ConfirmPopup({ isOpen, onSubmit, onClose, title, name, buttonText }) {

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit();
  }

  return (
    <PopupWithForm
      isOpen={isOpen}
      onSubmit={handleSubmit}
      onClose={onClose}
      title={title}
      name={name}
      buttonText={buttonText}
    />
  )
}
