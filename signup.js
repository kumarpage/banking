document
  .getElementById('signupForm')
  .addEventListener('submit', function (event) {
    event.preventDefault();

    const username = document.getElementById('username').value.trim();
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value;

    let users = JSON.parse(localStorage.getItem('users')) || [];

    if (
      users.some((user) => user.username === username || user.email === email)
    ) {
      alert('Username or email already exists. Please try another.');
      return;
    }

    users.push({ username, email, password });
    localStorage.setItem('users', JSON.stringify(users));

    let userData = JSON.parse(localStorage.getItem('userData')) || {};
    if (!userData[username]) {
      userData[username] = {
        accountHolder: username,
        accountNumber: 'XXXX-XXXX-XXXX-XXXX',
        accountType: 'Savings',
        currentBalance: 1000,
        recentTransactions: [],
        payees: [],
      };
      localStorage.setItem('userData', JSON.stringify(userData));
    }

    alert('Sign up successful! Redirecting to login...');
    window.location.href = 'login.html';
  });
