const usernameInput = document.getElementById('username');
const passwordInput = document.getElementById('password');
const message = document.getElementById('message');

document.getElementById('registerBtn').addEventListener('click', () => {
  const username = usernameInput.value;
  const password = passwordInput.value;

  fetch('/register', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password })
  })
  .then(res => res.text())
  .then(msg => message.textContent = msg)
  .catch(err => console.error(err));
});

document.getElementById('loginBtn').addEventListener('click', () => {
  const username = usernameInput.value;
  const password = passwordInput.value;

  fetch('/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password })
  })
  .then(res => res.text())
  .then(msg => message.textContent = msg)
  .catch(err => console.error(err));
});
