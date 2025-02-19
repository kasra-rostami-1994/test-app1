const express = require('express');
const { MongoClient } = require('mongodb');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;

// MongoDB URI and database connection
const uri = "mongodb+srv://rkasra18:920771018@cluster0.o5y10.mongodb.net/";
const dbName = "userDatabase";
let db;

// متصل شدن به MongoDB
MongoClient.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(client => {
    db = client.db(dbName);
    console.log('Connected to MongoDB');
  })
  .catch(error => {
    console.error('Error connecting to MongoDB:', error);
  });

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// صفحه اصلی
app.get('/', async (req, res) => {
  try {
    // خواندن اطلاعات کاربران از دیتابیس
    const users = await db.collection('users').find().toArray();
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

    // نمایش کاربران قبلی
    users.forEach(user => {
      html += `<li>Name: ${user.name}, Email: ${user.email}</li>`;
    });

    html += '</ul>';
    res.send(html);
  } catch (error) {
    console.error('Error reading from database:', error);
    res.status(500).send('Internal Server Error');
  }
});

// ارسال اطلاعات فرم و ذخیره در دیتابیس
app.post('/submit', async (req, res) => {
  const { name, email } = req.body;

  if (!name || !email) {
    return res.status(400).send('Name and Email are required!');
  }

  try {
    // ذخیره اطلاعات جدید در دیتابیس
    await db.collection('users').insertOne({ name, email });

    // پس از ذخیره، به صفحه اصلی برگشت
    res.redirect('/');
  } catch (error) {
    console.error('Error saving to database:', error);
    res.status(500).send('Internal Server Error');
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
