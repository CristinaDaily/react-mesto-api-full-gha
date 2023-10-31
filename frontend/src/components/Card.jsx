import React from 'react';
import CurrentUserContext from '../contexts/CurrentUserContext';

function Card({
  link,
  name,
  likes,
  onCardClick,
  cardOwner,
  onLikeClick,
  onDislikeClick,
  onCardDelete,
  id,
}) {
  const currentUser = React.useContext(CurrentUserContext);

  const handleCardClick = () => {
    onCardClick({ link, name });
  };

  const handleLikeClick = () => {
    isLiked ? onDislikeClick(id) : onLikeClick(id);
  };

  const handleDeleteClick = () => {
    onCardDelete(id);
  };

  // Определяем, являемся ли currentUser владельцем текущей карточки
  const isOwn = cardOwner === currentUser._id;

  // Определяем, есть ли у карточки лайк, поставленный текущим пользователем
  const isLiked = likes.some((id) => id === currentUser._id);

  const cardLikeButtonClassName = `element__like-btn ${
    isLiked && 'element__like-btn_active'
  }`;

  return (
    <article className='element'>
      <div className='element__image-container'>
        <img
          className='element__image'
          src={link}
          alt={name}
          onClick={handleCardClick}
        />
      </div>
      {isOwn && (
        <button
          type='button'
          className='element__delete-btn'
          onClick={handleDeleteClick}
        ></button>
      )}
      <div className='element__wrapper'>
        <h2 className='element__place-name'>{name}</h2>
        <div className='element__like-container'>
          <button
            type='button'
            onClick={handleLikeClick}
            className={`${cardLikeButtonClassName} button`}
          ></button>
          <p className='element__likes-number'>{likes.length}</p>
        </div>
      </div>
    </article>
  );
}

export default Card;
