const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const authRoutes = require('./routes/auth');  // روت‌های ثبت‌نام، ورود و پروفایل

dotenv.config();  // بارگذاری متغیرهای محیطی از فایل .env

const app = express();

// استفاده از JSON
app.use(express.json());

// اتصال به MongoDB
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch(err => {
    console.error('Error connecting to MongoDB:', err);
  });

// استفاده از روت‌ها
app.use('/api/auth', authRoutes);

// شروع سرور
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
