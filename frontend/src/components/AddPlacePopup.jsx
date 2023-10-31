import React from 'react';
import PopupWithForm from './PopupWithForm';

function AddPlacePopup({ isOpen, onClose, onAddPlace }) {
  const [link, setLink] = React.useState('');
  const [name, setName] = React.useState('');

  React.useEffect(() => {
    if (isOpen) {
      setLink('');
      setName('');
    }
  }, [isOpen]);

  function handleNameChange(e) {
    setName(e.target.value);
  }

  function handleLinkChange(e) {
    setLink(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    onAddPlace({
      name,
      link,
    });
  }
  return (
    <PopupWithForm
      name='card'
      title='Новое место'
      isOpen={isOpen}
      onClose={onClose}
      buttonText='Создать'
      onSubmit={handleSubmit}
    >
      <input
        type='text'
        name='name'
        placeholder='Название'
        className='popup__input popup__input_type_place'
        id='place-input'
        required
        minLength='2'
        maxLength='30'
        onChange={handleNameChange}
        value={name}
      />
      <span className='place-input-error popup__error'></span>
      <input
        type='url'
        name='link'
        placeholder='Ссылка на картинку'
        className='popup__input popup__input_type_link'
        id='link-input'
        required
        onChange={handleLinkChange}
        value={link}
      />
      <span className='link-input-error popup__error'></span>
    </PopupWithForm>
  );
}

export default AddPlacePopup;
