const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));

if (!loggedInUser) {
  alert('No logged-in user found. Redirecting to login...');
  window.location.href = 'login.html';
} else {
  function loadAccountDetails(data) {
    document.getElementById('accountHolder').textContent =
      data.accountHolder || 'N/A';
    document.getElementById('accountNumber').textContent =
      data.accountNumber || 'XXXX-XXXX-XXXX-XXXX';
    document.getElementById('accountType').textContent =
      data.accountType || 'Savings';
    document.getElementById('currentBalance').textContent =
      `$${data.currentBalance.toFixed(2)}` || '$0.00';

    const tBody = document.getElementById('recentTransactions');
    tBody.innerHTML = '';

    if (data.recentTransactions.length > 0) {
      data.recentTransactions.forEach((row) => {
        const tr = document.createElement('tr');
        tr.classList.add('border-b');

        const tdDate = document.createElement('td');
        tdDate.classList.add('p-2');
        tdDate.textContent = row.date;
        tr.appendChild(tdDate);

        const tdDesc = document.createElement('td');
        tdDesc.classList.add('p-2');
        tdDesc.textContent = row.description;
        tr.appendChild(tdDesc);

        const tdAmount = document.createElement('td');
        tdAmount.classList.add('p-2', 'text-right');
        const sign = row.amount > 0 ? '+' : '-';
        tdAmount.textContent = `${sign}$${Math.abs(row.amount).toFixed(2)}`;
        tdAmount.classList.add(
          row.amount > 0 ? 'text-green-600' : 'text-red-600'
        );
        tr.appendChild(tdAmount);

        const tdBalance = document.createElement('td');
        tdBalance.classList.add('p-2', 'text-right');
        tdBalance.textContent = `$${data.currentBalance.toFixed(2)}`;
        tr.appendChild(tdBalance);

        tBody.appendChild(tr);
      });
    } else {
      const tr = document.createElement('tr');
      const td = document.createElement('td');
      td.setAttribute('colspan', '4');
      td.classList.add('p-2', 'text-center', 'text-gray-500');
      td.textContent = 'No recent transactions.';
      tr.appendChild(td);
      tBody.appendChild(tr);
    }
  }

  const userData = JSON.parse(localStorage.getItem('userData')) || {};
  let data = userData[loggedInUser.username];

  if (loggedInUser.username === 'demo' && !data) {
    fetch('demo-data.json')
      .then((response) => response.json())
      .then((jsonData) => {
        data = jsonData;
        userData[loggedInUser.username] = data;
        localStorage.setItem('userData', JSON.stringify(userData));
        loadAccountDetails(data);
      })
      .catch((error) => {
        console.error('Error fetching demo data:', error);
        alert('Error loading demo account details. Redirecting to login');
        window.location.href = 'login.html';
      });
  } else {
    loadAccountDetails(data);
  }

  document
    .getElementById('logoutBtn')
    .addEventListener('click', function (event) {
      event.preventDefault();
      localStorage.removeItem('loggedInUser');
      alert('Logged out successfully!');
      window.location.href = 'index.html';
    });
}
