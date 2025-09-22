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
      `$${data.currentBalance}` || '$0.00';

    const tBody = document.getElementById('recentTransactions');
    tBody.innerHTML = '';

    if (data.recentTransactions && data.recentTransactions.length > 0) {
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
        tdAmount.textContent = `${row.amount}$`;
        tdAmount.classList.add(
          row.amount > 0 ? 'text-green-600' : 'text-red-600'
        );
        tr.appendChild(tdAmount);

        const tdBalance = document.createElement('td');
        tdBalance.classList.add('p-2', 'text-right');
        tdBalance.textContent = `$${data.currentBalance}`;
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

  if (loggedInUser.username === 'demo') {
    fetch('demo-data.json')
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        loadAccountDetails(data);
      })
      .catch((error) => {
        console.error('Error fetching demo data:', error);
        alert('Error loading demo account details. re-directing to login');
        window.location.href = 'login.html';
      });
  } else {
    loadAccountDetails({
      accountHolder: loggedInUser.username,
      accountNumber: 'XXXX-XXXX-XXXX-XXXX',
      accountType: 'Savings',
      currentBalance: 0,
      recentTransactions: [],
    });
  }

  //logout
  document
    .getElementById('logoutBtn')
    .addEventListener('click', function (event) {
      event.preventDefault();
      localStorage.removeItem('loggedInUser');
      alert('Logged out successfully!');
      window.location.href = 'index.html';
    });
}
