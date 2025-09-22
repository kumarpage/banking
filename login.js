let users = JSON.parse(localStorage.getItem('users')) || [];

const demoUserExists = users.some((user) => user.username === 'demo');

if (!demoUserExists) {
  users.push({ username: 'demo', email: 'user@example.com', password: '1' });
  localStorage.setItem('users', JSON.stringify(users));
}

document
  .getElementById('loginForm')
  .addEventListener('submit', function (event) {
    event.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    users = JSON.parse(localStorage.getItem('users'));

    const user = users.find(
      (u) => u.username === username && u.password === password
    );

    if (user) {
      alert('Login successful! Redirecting to account details...');
      localStorage.setItem('loggedInUser', JSON.stringify(user));
      window.location.href = 'account-details.html';
    } else {
      alert('Invalid username or password. Please try again.');
    }
  });
