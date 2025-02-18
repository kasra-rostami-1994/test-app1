const express = require('express');
const mongoose = require('mongoose');
const path = require('path');

const app = express();
const port = 3000;

// مسیرهای استاتیک
app.use(express.static(path.join(__dirname, 'public')));

// اتصال به MongoDB
const dbURI = process.env.DB_URI || 'mongodb+srv://rkasra18:920771018@cluster0.o5y10.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.log('Error connecting to MongoDB:', err));

// مسیر برای بررسی اتصال
app.get('/check-db-connection', (req, res) => {
  mongoose.connection.readyState === 1
    ? res.json({ status: 'success' })
    : res.json({ status: 'error' });
});

// مسیر برای نمایش فایل HTML
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => {
    console.error('Error connecting to MongoDB:', err);
  });
