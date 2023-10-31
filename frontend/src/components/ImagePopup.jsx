import React from 'react';

function ImagePopup({ card, onClose }) {
  return (
    <div className={`popup_type_image popup ${card ? 'popup_opened' : ''}`}>
      <div className='popup__box'>
        <button
          type='button'
          aria-label='закрыть'
          className='popup__close popup__close_type_image'
          onClick={onClose}
        ></button>
        <img className='popup__image' alt={card?.name} src={card?.link} />
        <h2 className='popup__img-title'>{card?.name}</h2>
      </div>
    </div>
  );
}

export default ImagePopup;
