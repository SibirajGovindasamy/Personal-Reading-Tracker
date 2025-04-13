// auth.js
function signUp() {
  const username = document.getElementById('signupUsername').value;
  const password = document.getElementById('signupPassword').value;

  if (!username || !password) {
    alert('Please enter a username and password.');
    return;
  }

  if (localStorage.getItem(`user_${username}`)) {
    alert('User already exists.');
    return;
  }

  localStorage.setItem(`user_${username}`, JSON.stringify({ password, books: [] }));
  alert('Signup successful!');
  window.location.href = 'login.html';
}

function login() {
  const username = document.getElementById('loginUsername').value;
  const password = document.getElementById('loginPassword').value;

  const user = JSON.parse(localStorage.getItem(`user_${username}`));

  if (!user || user.password !== password) {
    alert('Invalid username or password.');
    return;
  }

  localStorage.setItem('currentUser', username);
  window.location.href = 'index.html';
}

function logout() {
  localStorage.removeItem('currentUser');
  window.location.href = 'login.html';
}

function getCurrentUser() {
  return localStorage.getItem('currentUser');
}

function getUserData() {
  const user = getCurrentUser();
  return JSON.parse(localStorage.getItem(`user_${user}`));
}

function saveUserData(data) {
  const user = getCurrentUser();
  localStorage.setItem(`user_${user}`, JSON.stringify(data));
}
