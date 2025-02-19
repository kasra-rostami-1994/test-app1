const express = require('express');
const mongoose = require('mongoose');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;

// برای سرو کردن فایل‌های استاتیک
app.use(express.static(path.join(__dirname, 'public')));


// اتصال به MongoDB
const dbURI = 'mongodb+srv://rkasra18:920771018@cluster0.o5y10.mongodb.net/?retryWrites=true&w=majority';


mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => {
    console.error('Error connecting to MongoDB:', err);
  });

// مسیر برای بررسی اتصال به دیتابیس
app.get('/check-db-connection', (req, res) => {
    if (mongoose.connection.readyState === 1) {
      res.json({ status: 'success' });
    } else {
      res.json({ status: 'error' });
    }
  });
  
  

// مسیر برای نمایش فایل HTML
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

const cors = require('cors');
app.use(cors());

app.get('/check-db-connection', (req, res) => {
    console.log('Received request to check DB connection');
    if (mongoose.connection.readyState === 1) {
      console.log('DB connection is successful');
      res.json({ status: 'success' });
    } else {
      console.log('DB connection failed');
      res.json({ status: 'error' });
    }
  });
  