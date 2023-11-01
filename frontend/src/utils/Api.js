class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    //this._headers = options.headers;
  }

  _checkResponceResult(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Error:${res.status}`);
  }

  getAppInfo() {
    return Promise.all([this.getInitialCards(), this.getUserInfo()]);
  }

  getUserInfo() {
    //const token = localStorage.getItem('jwt');

    return fetch(`${this._baseUrl}/users/me`, {
      credentials: 'include',
      //headers:{
        //authorization: token,
       
      //},
    }).then(this._checkResponceResult);
  }

  getInitialCards() {
  //const token = localStorage.getItem('jwt');
    return fetch(`${this._baseUrl}/cards`, {
      credentials: 'include',
      //headers:{
        //authorization: token,
      //},
    }).then(this._checkResponceResult);
  }

  editProfile({ name, about }) {
    //const token = localStorage.getItem('jwt');

    return fetch(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      credentials: "include",
      headers:{
        //authorization: token,
       'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: name,
        about: about,
      }),
    }).then(this._checkResponceResult);
  }

  addNewCard({ name, link }) {
    //const token = localStorage.getItem('jwt');

    return fetch(`${this._baseUrl}/cards`, {
      method: 'POST',
      credentials: 'include',
      headers:{
        //authorization: token,
       'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: name,
        link: link,
      }),
    }).then(this._checkResponceResult);
  }

  addLike(cardId) {
    //const token = localStorage.getItem('jwt');

    return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: 'PUT',
      credentials: 'include',
      headers:{
        //authorization: token,
       'Content-Type': 'application/json',
      },
    }).then(this._checkResponceResult);
  }

  deleteLike(cardId) {
    //const token = localStorage.getItem('jwt');

    return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: 'DELETE',
      credentials: 'include',
      headers:{
        //authorization: token,
       'Content-Type': 'application/json',
      },
    }).then(this._checkResponceResult);
  }
  deleteCard(cardId) {
    //const token = localStorage.getItem('jwt');

    return fetch(`${this._baseUrl}/cards/${cardId}`, {
      method: 'DELETE',
      credentials: 'include',
      headers:{
        //authorization: token,
       'Content-Type': 'application/json',
      },
    }).then(this._checkResponceResult);
  }

  setAvatar(link) {
    //const token = localStorage.getItem('jwt');
    
    return fetch(`${this._baseUrl}/users/me/avatar `, {
      method: 'PATCH',
      credentials: 'include',
      headers:{
        //authorization: `Bearer ${token}`,
       'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        avatar: link,
      }),
    }).then(this._checkResponceResult);
  }
}

const api = new Api({
  //baseUrl: 'http://localhost:3000',
  baseUrl: 'https://api.mesto.nomoredomainsrocks.ru',
  
  /* headers: {
    authorization: 'b334b420-c534-4216-b0c2-8d90ef156992',
    'Content-Type': 'application/json',
  }, */
});

export default api;
