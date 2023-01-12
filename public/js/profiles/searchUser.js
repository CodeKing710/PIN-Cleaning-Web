async function searchUser() {
  let search = document.getElementById('search').value;
  // search = search === "" ? null : search;
  const output = document.getElementById('searchOutput');
  const list = document.createElement('table');
  list.className = 'cart-view';
  list.innerHTML = `<tr><th>Unpaid Invoices</th></tr>`;

  console.log("Making fetch");

  const users = await fetch('/profile/unpaid', {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({sq: search})
  });

  // const formatted = await users.json();
  console.log(users);

  formatted.forEach(user => {
    list.innerHTML += `<tr>
      <td><a href="/invoicing/${user.username}">${user.username}</a></td>
    </tr>`
  });

  output.appendChild(list);

}