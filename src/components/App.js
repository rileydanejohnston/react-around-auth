import React from 'react'
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';
import api from '../utils/api';
import {
  Switch,
  Route,
  useHistory
} from "react-router-dom";
import ProtectedRoute from './ProtectedRoute';
import Login from './Login';
import Register from './Register';
import InfoToolTip from './InfoToolTip';
import * as auth from '../utils/auth';

function App() {
  const history = useHistory();

  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({ link: '', name: '' });
  const [user, setUser] = React.useState({ name: '', about: '', avatar: ''});
  const [cards, setCards] = React.useState([]);
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [isToolTipOpen, setIsToolTipOpen] = React.useState(false);
  const [registerStatus, setRegisterStatus] = React.useState(false);
  const [userEmail, setUserEmail] = React.useState('');

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

  function openToolTip() {
    setIsToolTipOpen(true);
  }

  function closeToolTip() {
    const tempStatus = registerStatus;
    setIsToolTipOpen(false);
    setRegisterStatus(false);

    if (tempStatus){
      history.push('/login');
    }
  }


  function handleRegister(email, password) {
    auth.signup(email, password)
    .then((res) => {
      if (res.status === 201) {
        setRegisterStatus(true);
        return res.json();
      }
    })
    .then((res) => {
      console.log(res);
      openToolTip();
    })
    .catch((err) => {
      return err;
    });
  }

  function handleSignin(email, password) {
    auth.signin(email, password)
    .then((res) => {
      if (res.token){
        localStorage.setItem('jwt', res.token);
        setLoggedIn(true);
        setUserEmail(email);
        history.push('/');
      }
    });
  }

  function handleLogout() {
    localStorage.removeItem('jwt');
    setLoggedIn(false);
    setUserEmail('');
  }

  return (
    <div className='root'>
      <Header loggedIn={loggedIn} userEmail={userEmail} logout={handleLogout} />
      <Switch>
        <Route path='/login'>
          <Login onSignIn={handleSignin} />
        </Route>
        <Route path='/register'>
          <Register onRegister={handleRegister} />
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
      <InfoToolTip isOpen={isToolTipOpen} onClose={closeToolTip} registerStatus={registerStatus} />
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