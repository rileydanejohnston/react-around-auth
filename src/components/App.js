import React from 'react'
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';
import CurrentUserContext from '../contexts/CurrentUserContext';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
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
  const [currentUser, setCurrentUser] = React.useState({ name: '', about: '', avatar: '', _id: ''});
  const [cards, setCards] = React.useState([]);
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [isToolTipOpen, setIsToolTipOpen] = React.useState(false);
  const [registerStatus, setRegisterStatus] = React.useState(false);
  const [userEmail, setUserEmail] = React.useState('');

  React.useEffect(() => {
    api.getUserInfo()
    .then(({ name, about, avatar, _id }) => {
      setCurrentUser({ name, about, avatar, _id });
    })
    .catch((err) => console.log(err));
  }, []);
 
  React.useEffect(() => {
    api.getCards()
    .then((res) => {
      const cardData = res.map((item) => {
        return { likes: item.likes, name: item.name, link: item.link, cardId: item._id, ownerId: item.owner._id }
      });
      setCards(cardData);
    })
    .catch((err) => console.log(err));
  }, []);

  React.useEffect(() => {
    const closeByEscape = (e) => {
      if (e.key === 'Escape') {
        closeAllPopups();
      }
    }

    document.addEventListener('keydown', closeByEscape);

    return () => document.removeEventListener('keydown', closeByEscape);

  }, [])

  function handleCardLike(card) {
    const isLiked = card.likes.some(like => like._id === currentUser._id);

    api.changeLikeStatus(card.cardId, !isLiked)
    .then((res) => {
      const newCards = cards.map((prevCard) => {
        if (prevCard.cardId === res._id) {
          return { likes: res.likes, name: res.name, link: res.link, cardId: res._id, ownerId: res.owner._id };
        }
        return prevCard;
      });
      setCards(newCards);
    })  
    .catch((err) => console.log(err));
  }

  function handleDeleteCard(card) {

    api.deleteCard(card.cardId)
    .then((res) => {
      const newCards = cards.filter((prevCard) => { return prevCard.cardId !== card.cardId });
      setCards(newCards);
    })  
    .catch((err) => console.log(err));
  }

  function handleUpdateUser(formInput) {
    api.updateProfile(formInput)
    .then((res) => {
      const updateUser = {...currentUser, name: res.name, about: res.about };
      setCurrentUser(updateUser);
      closeAllPopups();
    })
    .catch((err) => console.log(err));
  }

  function handleUpdateAvatar(formInput) {
    api.updateProfilePic(formInput)
    .then((res) => {
      const updateUser = { ...currentUser, avatar: res.avatar };
      setCurrentUser(updateUser);
      closeAllPopups();
    })
    .catch((err) => console.log(err));
  }

  function handleAddPlaceSubmit(name, url) {
    api.addCard(name, url)
    .then((res) => {
      const newCard = {
        likes: res.likes, 
        name: res.name, 
        link: res.link, 
        cardId: res._id, 
        ownerId: res.owner._id
      };

      setCards([newCard, ...cards]);
      closeAllPopups();
    })
    .catch((err) => console.log(err));
  }

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
      setRegisterStatus(true);
      openToolTip();
    })
    .catch((err) => {
      console.log(err);
      openToolTip();
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
    localStorage.removeItem('email');
    setLoggedIn(false);
    setUserEmail('');
  }

  React.useEffect(() => {
    if (localStorage.getItem('jwt')){
      const jwt = localStorage.getItem('jwt');
      const email = localStorage.getItem('email');
      auth.authorize(jwt)
      .then((res) => {
        setLoggedIn(true);
        setUserEmail(email);
        history.push('/');
      })
    }
  }, []);

  return (
    <div className='root'>
      <CurrentUserContext.Provider value={currentUser}>
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
              cards={cards}
              onCardLike={handleCardLike}
              onDeleteClick={handleDeleteCard}
            />
          </ProtectedRoute>
        </Switch>
        <Footer />
        <ImagePopup card={selectedCard} onClose={closeAllPopups} />
        <PopupWithForm title='Are you sure?' name='confirm' />
        <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar} />
        <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser} />
        <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} onAddPlaceSubmit={handleAddPlaceSubmit} />
        <InfoToolTip isOpen={isToolTipOpen} onClose={closeToolTip} registerStatus={registerStatus} />
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;