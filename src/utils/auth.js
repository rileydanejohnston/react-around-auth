export const signup = (email, password) => {
  return fetch('https://register.nomoreparties.co/signup', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ password, email })
  })
  .then((res) => {
    return res;
  });
}

export const signin = (email, password) => {
  return fetch('https://register.nomoreparties.co/signin', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ password, email })
  })
  .then((res) => {
    if (res.ok){
      return res.json();
    }
  })
  .catch((err) => {
    console.log(err);
  });
}

export const authorize = (token) => {
  return fetch('https://register.nomoreparties.co/users/me', {
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