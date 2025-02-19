// ارسال داده‌ها به سرور
function saveUser() {
  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;

  fetch('https://www.kasrarostami.ir/save-user', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ name, email })
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error('Failed to save user');
      }
      return response.json();
    })
    .then((data) => {
      console.log('Response:', data); // بررسی داده دریافتی
      loadUsers();  // بارگذاری مجدد کاربران بعد از ذخیره
    })
    .catch((error) => {
      console.error('Error:', error);
    });
}

// بارگذاری کاربران از دیتابیس
function loadUsers() {
  fetch('https://www.kasrarostami.ir/users')
    .then((response) => {
      if (!response.ok) {
        throw new Error('Failed to fetch users');
      }
      return response.json();
    })
    .then((data) => {
      console.log('Fetched Users:', data); // بررسی داده‌های کاربران
      const usersList = document.getElementById('usersList');
      usersList.innerHTML = '';  // پاک کردن لیست قبلی
      data.forEach((user) => {
        usersList.innerHTML += `<p>${user.name} - ${user.email}</p>`;
      });
    })
    .catch((error) => {
      console.error('Error:', error);
    });
}

// اجرای تابع بارگذاری کاربران
loadUsers();
