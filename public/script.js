document.getElementById('userForm').addEventListener('submit', function(event) {
  event.preventDefault();

  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;

  fetch('https://www.kasrarostami.ir/save-user', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, email })
  })
  .then(response => response.text())
  .then(data => {
    console.log(data);
    loadUsers();  // Reload the users list after saving
  })
  .catch(error => console.error('Error:', error));
  
  function loadUsers() {
    fetch('https://www.kasrarostami.ir/users')
      .then(response => response.json())
      .then(data => {
        const usersList = document.getElementById('usersList');
        usersList.innerHTML = '';  // Clear the existing list
        data.forEach(user => {
          usersList.innerHTML += `<p>${user.name} - ${user.email}</p>`;
        });
      })
      .catch(error => console.error('Error:', error));
  }
  

loadUsers();  // Load users initially
