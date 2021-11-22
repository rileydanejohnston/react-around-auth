import React from 'react'
import Card from './Card'

export default function Main({ onEditProfileClick, onAddPlaceClick, onEditAvatarClick, onCardClick, user, cards }) 
{
  return (
    <main className='main'>
      <section className='profile'>
        <div className='profile__avatar' onClick={onEditAvatarClick} style={{ backgroundImage: `url(${user.avatar})` }}>
          <button className='profile__avatar-btn' type='button' />
        </div>
        <div className='profile__info-container'>
          <div className='profile__info'>
            <div className='profile__name-button'>
              <h1 className='profile__name'>{user.name}</h1>
              <button className='profile__edit-button' type='button' onClick={onEditProfileClick} />
            </div>
            <p className='profile__about'>{user.about}</p>
          </div>
          <button className='profile__add-button' type='button' onClick={onAddPlaceClick} />
        </div>
      </section>
      <section className='locations'>
        <ul className='cards'>
          {cards.map((item) => {
              return <Card key={`${item.id}`} card={item} onCardClick={onCardClick} />
          })}
        </ul>
      </section>
    </main>
  )
}
