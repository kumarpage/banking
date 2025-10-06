const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
if (!loggedInUser) {
  window.location.href = 'login.html';
}

document.getElementById('addPayeeForm').addEventListener('submit', (e) => {
  e.preventDefault();
  const name = document.getElementById('payeeName').value.trim();
  const accountNumber = document.getElementById('payeeAccount').value.trim();
  const bank = document.getElementById('payeeBank').value.trim();

  if (!name || !accountNumber || !bank) {
    alert('All fields are required.');
    return;
  }

  const userData = JSON.parse(localStorage.getItem('userData')) || {};
  userData[loggedInUser.username].payees.push({ name, accountNumber, bank });
  localStorage.setItem('userData', JSON.stringify(userData));

  alert('Payee added successfully!');
  window.location.href = 'transfer.html';
});
document
  .getElementById('logoutBtn')
  .addEventListener('click', function (event) {
    event.preventDefault();
    localStorage.removeItem('loggedInUser');
    alert('Logged out successfully!');
    window.location.href = 'index.html';
  });
