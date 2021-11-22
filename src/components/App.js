import React from 'react'
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';
import api from '../utils/api';
import {
  Switch,
  Route
} from "react-router-dom";
import ProtectedRoute from './ProtectedRoute';
import Login from './Login';
import Register from './Register';

function App() {

  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({ link: '', name: '' });
  const [user, setUser] = React.useState({ name: '', about: '', avatar: ''});
  const [cards, setCards] = React.useState([]);
  const [loggedIn, setLoggedIn] = React.useState(false);

  React.useEffect(() => {
    api.getUserInfo()
    .then(({ name, about, avatar }) => {
      setUser({ name, about, avatar });
    })
    .catch((err) => console.log(err));
    
    return () => {
    }
  }, []);
 
  React.useEffect(() => {
    api.getCards()
    .then((res) => {
      const cardData = res.map((item) => {
        return { likes: item.likes, name: item.name, link: item.link, id: item._id }
      });
      setCards(cardData);
    })
    .catch((err) => console.log(err));
    return () => {
    }
  }, []);

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function handleCardClick({ link, name }) {
    setSelectedCard({ link, name });
  }

  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setSelectedCard({ link: '', name: '' });
  }

  return (
    <div className='root'>
      <Header />
      <Switch>
      <Route path='/login'>
          <Login />
        </Route>
        <Route path='/register'>
          <Register />
        </Route>
        <ProtectedRoute exact path='/' loggedIn={loggedIn}>
          <Main 
            onEditProfileClick={handleEditProfileClick} 
            onAddPlaceClick={handleAddPlaceClick} 
            onEditAvatarClick={handleEditAvatarClick}
            onCardClick={handleCardClick}
            user={user}
            cards={cards}
          />
        </ProtectedRoute>
      </Switch>
      <Footer />
      <ImagePopup card={selectedCard} onClose={closeAllPopups} />
      <PopupWithForm title='Are you sure?' name='confirm' />
      <PopupWithForm title='Change profile picture' name='avatar' isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups}>
        <input className='popup__about popup__about_profile-pic popup__input' id='profile-pic-url' type='url' placeholder='Image link' name='pic' required />
        <span className='popup__error' id='profile-pic-url-error' />
      </PopupWithForm>
      <PopupWithForm title='Edit profile' name='profile' isOpen={isEditProfilePopupOpen} onClose={closeAllPopups}>
        <input className='popup__name popup__input' id='profile-name' type='text' placeholder='Name' name='name' minLength='2' maxLength='40' required />
        <span className='popup__error' id='profile-name-error' />
        <input className='popup__about popup__input' id='profile-about' type='text' placeholder='About' name='about' minLength='2' maxLength='200' required />
        <span className='popup__error' id='profile-about-error' />
      </PopupWithForm>
      <PopupWithForm title='New place' name='place' isOpen={isAddPlacePopupOpen} onClose={closeAllPopups}>
        <input className='popup__name popup__input' id='newPlace-name' type='text' placeholder='Title' name='title' minLength='1' maxLength='30' required />
        <span className='popup__error' id='newPlace-name-error' />
        <input className='popup__about popup__input' id='newPlace-about' type='url' placeholder='Image link' name='link' required />
        <span className='popup__error' id='newPlace-about-error' />
      </PopupWithForm>
      <div className='popup' id='confirmPopup'>
        <div className='popup__container'>
          <button className='popup__close' type='button' />
          <form className='popup__form' id='confirm-form' method='POST' name='form'>
            <h3 className='popup__title popup__title_confirm'>Are you sure?</h3>
            <button className='popup__submit popup__submit_confirm' id='confirm-submit' type='submit' name='submit'>Yes</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default App;