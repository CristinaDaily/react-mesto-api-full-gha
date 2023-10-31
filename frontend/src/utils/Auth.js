export const BASE_URL = 'http://localhost:3000';

const getResponseData = (res) => {
  if (!res.ok) {
    return Promise.reject(`Error: ${res.status}`);
  }
  return res.json();
};

export const register = (password, email) => {
  return fetch(`${BASE_URL}/signup`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ password, email }),
  }).then(getResponseData);
};

export const login = (password, email) => {
  return fetch(`${BASE_URL}/signin`, {
    method: 'POST',
    credentials: "include",
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ password, email }),
  }).then(getResponseData);
};

export const getContent = (token) => {
  // token was an argument add to brackets aboove
  //const token = localStorage.getItem('jwt');

  return fetch(`${BASE_URL}/users/me`, {
    method: 'GET',
    credentials: "include",
    headers: {
      'Content-Type': 'application/json',
      //Authorization: `Bearer ${token}`,
    },
  }).then(getResponseData);
};
