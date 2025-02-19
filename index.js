const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;

// تنظیمات bodyParser برای پردازش داده‌های فرم
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// مسیر برای نمایش فرم
app.get('/', (req, res) => {
  // خواندن داده‌ها از فایل متنی
  const users = readUsersFromFile();
  
  let html = `
    <form action="/submit" method="POST">
      <label for="name">Name:</label><br>
      <input type="text" id="name" name="name" required><br><br>
      <label for="email">Email:</label><br>
      <input type="email" id="email" name="email" required><br><br>
      <input type="submit" value="Submit">
    </form>
    <h3>Previous Users:</h3>
    <ul>
  `;
  
  // نمایش کاربران قبلی از فایل
  users.forEach(user => {
    html += `<li>Name: ${user.name}, Email: ${user.email}</li>`;
  });
  
  html += '</ul>';
  res.send(html);
});

// مسیر برای دریافت داده‌های فرم و ذخیره در فایل متنی
app.post('/submit', (req, res) => {
  const { name, email } = req.body;

  // ذخیره اطلاعات جدید در فایل متنی
  const users = readUsersFromFile();
  users.push({ name, email });

  writeUsersToFile(users);

  // پس از ذخیره، به صفحه اصلی برگشت
  res.redirect('/');
});

// خواندن داده‌ها از فایل نوت‌متنی
function readUsersFromFile() {
  const filePath = path.join(__dirname, 'users.txt');
  let users = [];

  if (fs.existsSync(filePath)) {
    const data = fs.readFileSync(filePath, 'utf-8');
    users = data.split('\n').filter(Boolean).map(line => {
      const [name, email] = line.split(',');
      return { name, email };
    });
  }

  return users;
}

// نوشتن داده‌ها به فایل نوت‌متنی
function writeUsersToFile(users) {
  const filePath = path.join(__dirname, 'users.txt');
  const data = users.map(user => `${user.name},${user.email}`).join('\n');
  fs.writeFileSync(filePath, data, 'utf-8');
}

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
