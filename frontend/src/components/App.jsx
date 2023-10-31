import React from 'react';

import Header from './Header.jsx';
import Footer from './Footer.jsx';
import Main from './Main.jsx';
import ImagePopup from './ImagePopup.jsx';
import EditProfilePopup from './EditProfilePopup.jsx';
import EditAvatarPopup from './EditAvatarPopup.jsx';
import AddPlacePopup from './AddPlacePopup.jsx';
import ConfirmCardDeletePopup from './ConfirmCardDelepePopup.jsx';
import InfoTooltip from './InfoTooltip.jsx';
import api from '../utils/Api';
import CurrentUserContext from '../contexts/CurrentUserContext.js';
import { Route, Routes, Navigate, useNavigate } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute.js';
import Register from './Register.jsx';
import Login from './Login.jsx';
import * as auth from '../utils/Auth.js';
import * as token from '../utils/token.js';

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] =
    React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] =
    React.useState(false);
  const [isConfirmPopupOpen, setIsConfirmPopupOpen] = React.useState(false);
  const [isInfoToolPopupOpen, setisInfoToolPopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState(null);
  const [selectedCardId, setSelectedCardId] = React.useState('');
  const [currentUser, setCurrentUser] = React.useState({});
  const [cards, setCards] = React.useState([]);
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [userData, setUserData] = React.useState({});
  const [isRegistrationSuccessful, setIsRegistrationSuccessful] =
    React.useState(false);

  const navigate = useNavigate();

  React.useEffect(() => {
    if (loggedIn) {
      api
        .getAppInfo()
        .then(([cardsData, userData]) => {
          setCards(cardsData);
          setCurrentUser(userData);
        })
        .catch((err) => console.log(err));
    }
  }, [loggedIn]);

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(!isEditProfilePopupOpen);
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(!isEditAvatarPopupOpen);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(!isAddPlacePopupOpen);
  }

  function handleRegistration() {
    setisInfoToolPopupOpen(true);
  }

  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setSelectedCard(null);
    setIsConfirmPopupOpen(false);
    setisInfoToolPopupOpen(false);
  }

  function handleCardClick(cardData) {
    setSelectedCard(cardData);
  }

  function handleCardLike(id) {
    api
      .addLike(id)
      .then((newCardData) => {
        console.log(newCardData)
        setCards((state) =>
          state.map((card) => (card._id === id ? newCardData : card))
        );
      })
      .catch((err) => {
        console.log(`Handle like error:${err}`);
      });
  }

  function handleCardDislike(id) {
    api
      .deleteLike(id)
      .then((newCardData) => {
        setCards((state) =>
          state.map((card) => (card._id === id ? newCardData : card))
        );
      })
      .catch((err) => {
        console.log(`Handle dislike error:${err}`);
      });
  }

  function handleConfirmPopupOpen(id) {
    setIsConfirmPopupOpen(!isConfirmPopupOpen);
    setSelectedCardId(id);
  }

  function handleCardDelete(id) {
    api
      .deleteCard(id)
      .then((res) => {
        setCards((state) => state.filter((card) => card._id !== id));
        closeAllPopups();
      })
      .catch((err) => {
        console.log(`Delete card error:${err}`);
      });
  }

  function handleUpdateUser({ name, about }) {
    api
      .editProfile({ name, about })
      .then((newUserInfo) => {
        setCurrentUser(newUserInfo);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(`Profila update err:${err}`);
      });
  }

  function handleUpdateAvatar({ avatar }) {
    api
      .setAvatar(avatar)
      .then((newAvatarData) => {
        setCurrentUser(newAvatarData);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(`Avatar update err:${err}`);
      });
  }

  function handleAddPlaceSubmit({ link, name }) {
    api
      .addNewCard({ link, name })
      .then((newCardData) => {
        setCards([newCardData, ...cards]);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(`Add place confirmation error:${err}`);
      });
  }

  function handleRegister({ password, email }) {
    return auth
      .register(password, email)
      .then((res) => {
        setIsRegistrationSuccessful(true);
        handleRegistration();
        return res;
      })
      .catch((err) => {
        console.log(`Registration error: ${err}`);
        setIsRegistrationSuccessful(false);
        handleRegistration();
      });
  }

  function getGwt(jwt) {
    return auth
      .getContent(jwt)
      .then((res) => {
        return res;
      })
      .catch((error) => {
        console.log(`Error during token check:${error} `);
        throw error;
      });
  }

  React.useEffect(() => {
    //tockenCeck
    const jwt = token.getToken();
    if (jwt) {
      getGwt(jwt)
        .then((res) => {
          if (res) {
            setUserData({ email: res.email, id: res._id });
            setLoggedIn(true);
          }
        })
        .catch((err) => {
          console.log('Error during token validation:', err);
          token.removeToken();
        });
    }
  }, []);

  React.useEffect(() => {
    if (loggedIn) {
      navigate('/');
    }
  }, [loggedIn]);

  function handleLogin({ password, email }) {
    return auth
      .login(password, email)
      .then((res) => {
        if(res) {
          token.setToken(res._id)
        
        /*if (res.token) {
          token.setToken(res.token);*/ //тут изменения для куков
          return res;
        } else {
          return;
        }
      })
      .then((res) => {
        if (res._id) {
          setUserData({ email: email });
          setLoggedIn(true);
          navigate('/');
        }
      })
      .catch((err) => {
        console.log(`Login error: ${err}`);
        setLoggedIn(false);
      });
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className='body'>
        <div className='page'>
          <Header userData={userData} />
          <Routes>
            <Route
              path='/'
              element={
                <ProtectedRoute
                  element={Main}
                  loggedIn={loggedIn}
                  onEditProfile={handleEditProfileClick}
                  onAddPlace={handleAddPlaceClick}
                  onEditAvatar={handleEditAvatarClick}
                  onCardClick={handleCardClick}
                  onLikeClick={handleCardLike}
                  onDislikeClick={handleCardDislike}
                  onCardDelete={handleConfirmPopupOpen}
                  cards={cards}
                />
              }
            />
            <Route
              path='/signup'
              element={<Register onRegister={handleRegister} />}
            />
            <Route path='/signin' element={<Login onLogin={handleLogin} />} />
            <Route
              path='*'
              element={
                loggedIn ? (
                  <Navigate to='/' replace />
                ) : (
                  <Navigate to='/signin' replace />
                )
              }
            />
          </Routes>
          {loggedIn && <Footer />}
          <InfoTooltip
            isOpen={isInfoToolPopupOpen}
            onClose={closeAllPopups}
            isSuccessful={isRegistrationSuccessful}
            successRegMsg='Вы успешно зарегистрировались!'
            errorRegMsg='Что-то пошло не так! Попробуйте ещё раз.'
          />
          <EditProfilePopup
            isOpen={isEditProfilePopupOpen}
            onClose={closeAllPopups}
            onUpdateUser={handleUpdateUser}
          />
          <AddPlacePopup
            isOpen={isAddPlacePopupOpen}
            onClose={closeAllPopups}
            onAddPlace={handleAddPlaceSubmit}
          ></AddPlacePopup>
          <EditAvatarPopup
            isOpen={isEditAvatarPopupOpen}
            onClose={closeAllPopups}
            onUpdateAvatar={handleUpdateAvatar}
          />
          <ConfirmCardDeletePopup
            isOpen={isConfirmPopupOpen}
            onClose={closeAllPopups}
            onDeleteCard={handleCardDelete}
            selectedCardId={selectedCardId}
          />
          <ImagePopup card={selectedCard} onClose={closeAllPopups} />
        </div>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
