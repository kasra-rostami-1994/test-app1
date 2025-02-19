// بارگذاری کاربران از API
async function loadUsers() {
  try {
    const response = await fetch('https://www.kasrarostami.ir/users'); // به این URL درخواست بدهید
    if (response.ok) {
      const users = await response.json();
      console.log(users); // نمایش داده‌ها در کنسول
      // در اینجا می‌توانید داده‌ها را در صفحه نمایش دهید
    } else {
      throw new Error('Failed to fetch users');
    }
  } catch (error) {
    console.error('Error:', error);
  }
}

// ذخیره کاربر در API
async function saveUser() {
  const user = {
    name: 'John Doe',
    email: 'john@example.com',
  };

  try {
    const response = await fetch('https://www.kasrarostami.ir/save-user', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    });

    if (response.ok) {
      const result = await response.json();
      console.log(result); // نمایش پیغام موفقیت در کنسول
    } else {
      throw new Error('Failed to save user');
    }
  } catch (error) {
    console.error('Error:', error);
  }
}
