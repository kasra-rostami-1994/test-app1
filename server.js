const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 3000;

// بارگذاری متغیرهای محیطی
dotenv.config();

// استفاده از CORS
app.use(cors());

// استفاده از JSON در درخواست‌ها
app.use(express.json());

// اتصال به MongoDB (با استفاده از URL دیتابیس شما)
const dbURI = process.env.MONGO_URI || 'mongodb://mongo:xHiAnMkKTnPWFWQWJrDMjMHMHNvBqfQK@nozomi.proxy.rlwy.net:34049';

// اتصال به دیتابیس MongoDB
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => {
    console.error('Error connecting to MongoDB:', err);
  });

// مدل کاربر
const User = mongoose.model('User', new mongoose.Schema({
  name: String,
  email: String,
}));

// بررسی اتصال به دیتابیس
app.get('/check-db-connection', (req, res) => {
  if (mongoose.connection.readyState === 1) {
    res.json({ status: 'success' });
  } else {
    res.json({ status: 'error' });
  }
});

// ذخیره‌سازی اطلاعات کاربر
app.post('/save-user', (req, res) => {
  const { name, email } = req.body;
  const newUser = new User({ name, email });

  newUser.save()
    .then(() => {
      console.log('User saved successfully');
      res.status(200).json({ message: 'User saved' });
    })
    .catch((err) => {
      console.error('Failed to save user:', err);
      res.status(500).json({ error: 'Failed to save user' });
    });
});

// دریافت اطلاعات کاربران
app.get('/users', (req, res) => {
  User.find()
    .then((users) => {
      console.log('Users fetched successfully:', users);
      res.json(users);
    })
    .catch((err) => {
      console.error('Failed to fetch users:', err);
      res.status(500).json({ error: 'Failed to fetch users' });
    });
});

// سرور شروع به کار می‌کند
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
