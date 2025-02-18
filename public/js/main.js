document.getElementById('registerForm').addEventListener('submit', async (e) => {
    e.preventDefault();
  
    const response = await fetch('/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        password: document.getElementById('password').value,
        age: document.getElementById('age').value,
        city: document.getElementById('city').value
      })
    });
  
    const data = await response.json();
    if (response.ok) {
      alert('ثبت‌نام موفق!');
    } else {
      alert(data.message);
    }
  });
  

  document.getElementById('loginForm').addEventListener('submit', async (e) => {
    e.preventDefault();
  
    const response = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: document.getElementById('loginEmail').value,
        password: document.getElementById('loginPassword').value
      })
    });
  
    const data = await response.json();
    if (response.ok) {
      localStorage.setItem('token', data.token);
      alert('ورود موفق!');
      window.location.href = '/profile.html';
    } else {
      alert(data.message);
    }
  });

  
  const token = localStorage.getItem('token');
if (!token) {
  alert('ابتدا وارد شوید!');
  window.location.href = '/login.html';
}

fetch('/api/auth/me', {
  method: 'GET',
  headers: { 'Authorization': `Bearer ${token}` }
})
  .then(res => res.json())
  .then(data => {
    document.getElementById('userInfo').innerHTML = `
      <p>نام: ${data.name}</p>
      <p>ایمیل: ${data.email}</p>
      <p>سن: ${data.age}</p>
      <p>شهر: ${data.city}</p>
    `;
  })
  .catch(() => {
    alert('خطا در بارگذاری اطلاعات');
  });
