const express = require('express');
const path = require('path');
const app = express();
const port = 5000;

// تنظیمات مربوط به ارسال فایل‌های استاتیک (HTML، CSS، JS)
app.use(express.static(path.join(__dirname, 'public')));

// مسیر اصلی که صفحه index.html را نمایش می‌دهد
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// راه‌اندازی سرور
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
