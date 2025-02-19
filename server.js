const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 3000;

// استفاده از CORS
app.use(cors());

// استفاده از bodyParser برای پردازش داده‌های POST
app.use(bodyParser.json());

// سرو کردن فایل‌های استاتیک از پوشه public
app.use(express.static(path.join(__dirname, 'public')));

// اتصال به MongoDB
const dbURI = process.env.DB_URI || 'mongodb://mongo:xHiAnMkKTnPWFWQWJrDMjMHMHNvBqfQK@nozomi.proxy.rlwy.net:34049';
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => {
    console.error('Error connecting to MongoDB:', err);
  });

// مدل برای ذخیره کاربر
const User = mongoose.model('User', new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true }
}));

// مسیر برای ذخیره‌سازی کاربر در دیتابیس
app.post('/save-user', async (req, res) => {
  const { name, email } = req.body;
  try {
    const user = new User({ name, email });
    await user.save();
    res.status(200).json({ message: 'User saved successfully!' });
  } catch (error) {
    console.error('Error saving user:', error);
    res.status(500).json({ message: 'Error saving user.' });
  }
});

// مسیر برای نمایش کاربران
app.get('/users', async (req, res) => {
  try {
    const users = await User.find({});
    res.status(200).json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ message: 'Error fetching users.' });
  }
});

// بررسی اتصال به دیتابیس
app.get('/check-db-connection', (req, res) => {
  if (mongoose.connection.readyState === 1) {
    res.json({ status: 'success' });
  } else {
    res.json({ status: 'error' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
