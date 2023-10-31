import React from 'react';
import iconEditProfile from '../images/edit-profile.svg';
import Card from './Card.jsx';
import CurrentUserContext from '../contexts/CurrentUserContext';

function Main({
  onEditProfile,
  onAddPlace,
  onEditAvatar,
  onCardClick,
  onLikeClick,
  onDislikeClick,
  onCardDelete,
  cards,
}) {
  const currentUser = React.useContext(CurrentUserContext);

  return (
    <>
      <main className='content'>
        <section className='profile'>
          <div className='profile__container'>
            <img
              className='profile__avatar'
              alt='Фотография'
              src={currentUser.avatar}
            />
            <div className='profile__overlay'>
              <img
                className='profile__edit-icon'
                aria-label='Иконка редактирования аватара'
                src={iconEditProfile}
                onClick={onEditAvatar}
              />
            </div>
          </div>
          <div className='profile__info'>
            <h1 className='profile__name'>{currentUser.name}</h1>
            <button
              type='button'
              aria-label='кнопка редактирования'
              className='profile__edit-button button'
              onClick={onEditProfile}
            ></button>

            <p className='profile__occupation'>{currentUser.about}</p>
          </div>
          <button
            type='button'
            aria-label='кнопка добавления карточки'
            className='profile__add-button button'
            onClick={onAddPlace}
          ></button>
        </section>
        <section className='elements'>
          {cards.map((propsData) => (
            <Card
              link={propsData?.link}
              name={propsData.name}
              likes={propsData.likes}
              key={propsData._id}
              onCardClick={onCardClick}
              cardOwner={propsData.owner}
              onLikeClick={onLikeClick}
              id={propsData._id}
              onDislikeClick={onDislikeClick}
              onCardDelete={onCardDelete}
            />
          ))}
        </section>
      </main>
    </>
  );
}

export default Main;
