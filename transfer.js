const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
if (!loggedInUser) {
  window.location.href = 'login.html';
}

const userData = JSON.parse(localStorage.getItem('userData')) || {};
let user = userData[loggedInUser.username] || {};

populatePayees();

function populatePayees() {
  const payeeSelect = document.getElementById('payee');
  payeeSelect.innerHTML = '';
  if (user.payees.length === 0) {
    const option = document.createElement('option');
    option.textContent = 'No payees available';
    option.disabled = true;
    payeeSelect.appendChild(option);
  } else {
    user.payees.forEach((p) => {
      const option = document.createElement('option');
      option.value = p.name;
      option.textContent = `${p.name} (${p.accountNumber})`;
      payeeSelect.appendChild(option);
    });
  }
}

document.getElementById('transferForm').addEventListener('submit', (e) => {
  e.preventDefault();
  const payee = document.getElementById('payee').value;
  const amount = parseFloat(document.getElementById('amount').value);
  const desc = document.getElementById('desc').value || `Transfer to ${payee}`;

  if (!payee || amount <= 0 || amount > user.currentBalance) {
    alert('Invalid transfer.');
    return;
  }

  user.currentBalance -= amount;
  user.recentTransactions.push({
    date: new Date().toLocaleDateString('en-US'),
    description: desc,
    amount: -amount,
  });

  userData[loggedInUser.username] = user;
  localStorage.setItem('userData', JSON.stringify(userData));

  alert('Transfer successful!');
  window.location.href = 'account-details.html';
});

//logout
document
  .getElementById('logoutBtn')
  .addEventListener('click', function (event) {
    event.preventDefault();
    localStorage.removeItem('loggedInUser');
    alert('Logged out successfully!');
    window.location.href = 'index.html';
  });
