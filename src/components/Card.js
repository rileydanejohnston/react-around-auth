import React from 'react'

export default function Card({ card, onCardClick}) {

  function handleClick() {
    onCardClick(card);
  }
  
  return (
    <li className='cards__item'>
        <button className='cards__close-button' type='button' />
        <img className='cards__photo' src={card.link} alt={card.name} onClick={handleClick} />
        <div className='cards__label'>
          <h2 className='cards__name'>{card.name}</h2>
          <div className='cards__like'>
            <button className='cards__like-button' type='button' />
            <p className='cards__like-count'>{card.likes.length}</p>
          </div>
        </div>
      </li>
  )
}
