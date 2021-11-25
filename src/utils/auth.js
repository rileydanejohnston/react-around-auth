const baseUrl = 'https://register.nomoreparties.co';

const handleResponse = (res) => {
  if (res.ok){
    return res.json();
  }
  return Promise.reject();
}

export const signup = (email, password) => {
  return fetch(`${baseUrl}/signup`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ password, email })
  })
  .then((res) => {
    return handleResponse(res);
  });
}

export const signin = (email, password) => {
  return fetch(`${baseUrl}/signin`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ password, email })
  })
  .then((res) => {
    if (res.ok){
      localStorage.setItem('email', email);
      return res.json();
    }
  })
  .catch((err) => {
    console.log(err);
  });
}

export const authorize = (token) => {
  return fetch(`${baseUrl}/users/me`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    }
  })
  .then((res) => {
    if (res.ok) {
      return res.json();
    }
  })
  .then((res) => {
    return res;
  })
  .catch((err) => console.log(err));
}