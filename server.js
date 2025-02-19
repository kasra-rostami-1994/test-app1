// server.js
const express = require('express');
const xlsx = require('xlsx');
const bodyParser = require('body-parser');
const fs = require('fs');

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// مسیر برای نمایش فرم
app.get('/', (req, res) => {
  // بارگذاری اطلاعات از فایل اکسل
  const users = readExcelData();
  let html = `
    <form action="/submit" method="POST">
      <label for="name">Name:</label><br>
      <input type="text" id="name" name="name"><br><br>
      <label for="email">Email:</label><br>
      <input type="email" id="email" name="email"><br><br>
      <input type="submit" value="Submit">
    </form>
    <h3>Previous Users:</h3>
    <ul>
  `;
  users.forEach(user => {
    html += `<li>Name: ${user.name}, Email: ${user.email}</li>`;
  });
  html += '</ul>';
  res.send(html);
});

// مسیر برای دریافت داده‌های فرم و ذخیره در فایل اکسل
app.post('/submit', (req, res) => {
  const { name, email } = req.body;
  
  // ذخیره اطلاعات جدید در فایل اکسل
  const users = readExcelData();
  users.push({ name, email });
  
  writeExcelData(users);
  
  res.redirect('/');
});

// خواندن داده‌ها از فایل اکسل
function readExcelData() {
  const filePath = './users.xlsx';
  let users = [];
  
  if (fs.existsSync(filePath)) {
    const workbook = xlsx.readFile(filePath);
    const sheet = workbook.Sheets[workbook.SheetNames[0]];
    users = xlsx.utils.sheet_to_json(sheet);
  }
  
  return users;
}

// نوشتن داده‌ها به فایل اکسل
function writeExcelData(users) {
  const ws = xlsx.utils.json_to_sheet(users);
  const wb = xlsx.utils.book_new();
  xlsx.utils.book_append_sheet(wb, ws, 'Users');
  xlsx.writeFile(wb, './users.xlsx');
}

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
