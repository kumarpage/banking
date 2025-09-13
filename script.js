document
  .getElementById('loginForm')
  .addEventListener('submit', function (event) {
    event.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // Mock login service (hardcoded for demo)
    if (username === 'user' && password === '1111') {
      alert('Login successful! Redirecting to account details...');
      // Redirect to account details (placeholder; create account-details.html later)
      window.location.href = 'account-details.html';
    } else {
      alert('Invalid username or password. Please try again.');
    }
  });
