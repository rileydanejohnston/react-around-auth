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