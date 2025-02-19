const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

// راه‌اندازی اپلیکیشن Express
const app = express();
const port = process.env.PORT || 3000;

// استفاده از CORS برای رفع مشکلات دسترسی از منابع مختلف
app.use(cors());

// برای پردازش داده‌های JSON در بدن درخواست‌ها
app.use(express.json());

// اتصال به دیتابیس MongoDB از طریق URL که در ورسل تنظیم شده است
const dbURI = process.env.MONGO_URL || 'mongodb://mongo:xHiAnMkKTnPWFWQWJrDMjMHMHNvBqfQK@nozomi.proxy.rlwy.net:34049';

mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB on Railway'))
  .catch((error) => console.error('Error connecting to MongoDB:', error));

// تعریف مدل برای داده‌های کاربران
const userSchema = new mongoose.Schema({
  name: String,
  email: String,
});

const User = mongoose.model('User', userSchema);

// مسیر برای ذخیره اطلاعات کاربر
app.post('/save-user', (req, res) => {
  const { name, email } = req.body;

  const newUser = new User({ name, email });

  newUser.save()
    .then(() => {
      res.status(200).send('User saved successfully');
    })
    .catch((error) => {
      res.status(500).send('Error saving user');
      console.error('Error saving user:', error);
    });
});

// مسیر برای دریافت اطلاعات کاربران
app.get('/users', (req, res) => {
  User.find()
    .then((users) => {
      res.json(users);
    })
    .catch((error) => {
      res.status(500).send('Error retrieving users');
      console.error('Error retrieving users:', error);
    });
});

// مسیر برای بررسی اتصال به دیتابیس
app.get('/check-db-connection', (req, res) => {
  if (mongoose.connection.readyState === 1) {
    res.json({ status: 'success' });
  } else {
    res.json({ status: 'error' });
  }
});

// سرو کردن فایل‌های استاتیک (HTML، JS، CSS و ...)
app.use(express.static(path.join(__dirname)));

// شروع سرور
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
