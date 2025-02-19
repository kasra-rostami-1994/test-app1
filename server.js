const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const Data = require('./models/Data'); // مدل داده

const app = express();
const port = process.env.PORT || 3000;

// استفاده از express.json برای پردازش درخواست‌های JSON
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// اتصال به MongoDB
const dbURI = process.env.DB_URI || 'mongodb+srv://rkasra18:920771018@cluster0.o5y10.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('Error connecting to MongoDB:', err));

// ذخیره داده‌ها در MongoDB
app.post('/submit-data', async (req, res) => {
  const { name, message } = req.body;
  
  try {
    const newData = new Data({ name, message });
    await newData.save();
    res.status(200).send({ message: 'Data saved successfully' });
  } catch (error) {
    res.status(500).send({ message: 'Failed to save data', error });
  }
});

// دریافت داده‌های ذخیره‌شده از MongoDB
app.get('/get-data', async (req, res) => {
  try {
    const data = await Data.find();
    res.json(data);
  } catch (error) {
    res.status(500).send({ message: 'Failed to retrieve data', error });
  }
});

// مسیر برای نمایش فایل HTML
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});


// const cors = require('cors');

// // استفاده از CORS
// app.use(cors({
//   origin: 'https://www.kasrarostami.ir', // آدرس سایت اصلی شما
//   methods: ['GET', 'POST'],
//   allowedHeaders: ['Content-Type']
// }));
