import React from 'react';
import PopupWithForm from './PopupWithForm.jsx';
import CurrentUserContext from '../contexts/CurrentUserContext';

function EditProfilePopup({ isOpen, onClose, onUpdateUser }) {
  const [name, setName] = React.useState('');
  const [description, setDescription] = React.useState('');

  const currentUser = React.useContext(CurrentUserContext);

  React.useEffect(() => {
    setName(currentUser.name || '');
    setDescription(currentUser.about || '');
  }, [currentUser, isOpen]);

  function handleNameChange(e) {
    setName(e.target.value);
  }

  function handleDescriptionChange(e) {
    setDescription(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();

    // Передаём значения управляемых компонентов во внешний обработчик
    onUpdateUser({
      name,
      about: description,
    });
  }

  return (
    <PopupWithForm
      name='profile'
      title='Редактировать профиль'
      isOpen={isOpen}
      onClose={onClose}
      buttonText='Сохранить'
      onSubmit={handleSubmit}
    >
      <input
        type='text'
        name='name'
        placeholder='Имя'
        className='popup__input popup__input_type_name'
        id='name-input'
        required
        minLength='2'
        maxLength='40'
        onChange={handleNameChange}
        value={name}
      />
      <span className='name-input-error popup__error'></span>
      <input
        type='text'
        name='about'
        placeholder='o себе'
        className='popup__input popup__input_type_about'
        id='about-input'
        required
        minLength='2'
        maxLength='200'
        onChange={handleDescriptionChange}
        value={description}
      />
      <span className='about-input-error popup__error'></span>
    </PopupWithForm>
  );
}
export default EditProfilePopup;
