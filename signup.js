document
  .getElementById('signupForm')
  .addEventListener('submit', function (event) {
    event.preventDefault();

    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    let users = JSON.parse(localStorage.getItem('users')) || [];

    users.push({ username, email, password });
    localStorage.setItem('users', JSON.stringify(users));

    alert('Sign up successful! Redirecting to login...');
    window.location.href = 'login.html';
  });
