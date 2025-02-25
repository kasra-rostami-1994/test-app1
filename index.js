const express = require('express');
const { MongoClient, ObjectId } = require('mongodb');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;

// MongoDB URI and database connection
const uri = process.env.DB_URI || "mongodb+srv://rkasra18:920771018@cluster0.o5y10.mongodb.net/";
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
      <a href="/public/zohoverify/verifyforzoho.html">verify</a>
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
      html += `
        <hr>
        <li>
          Name: ${user.name}<br>Email: ${user.email}
          <form action="/delete/${user._id}" method="POST">
            <button type="submit">Delete</button>
          </form>
          <form action="/edit/${user._id}" method="GET">
            <button type="submit">Edit</button>
          </form>
        </li>
      `;
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

// حذف کاربر
app.post('/delete/:id', async (req, res) => {
  const { id } = req.params;

  try {
    await db.collection('users').deleteOne({ _id: new ObjectId(id) });
    res.redirect('/');
  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(500).send('Internal Server Error');
  }
});

// ویرایش کاربر (GET)
app.get('/edit/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const user = await db.collection('users').findOne({ _id: new ObjectId(id) });
    if (user) {
      res.send(`
        <form action="/edit/${id}" method="POST">
          <label for="name">Name:</label><br>
          <input type="text" id="name" name="name" value="${user.name}" required><br><br>
          <label for="email">Email:</label><br>
          <input type="email" id="email" name="email" value="${user.email}" required><br><br>
          <input type="submit" value="Update">
        </form>
      `);
    } else {
      res.status(404).send('User not found');
    }
  } catch (error) {
    console.error('Error retrieving user for editing:', error);
    res.status(500).send('Internal Server Error');
  }
});

// ویرایش کاربر (POST)
app.post('/edit/:id', async (req, res) => {
  const { id } = req.params;
  const { name, email } = req.body;

  try {
    await db.collection('users').updateOne(
      { _id: new ObjectId(id) },
      { $set: { name, email } }
    );
    res.redirect('/');
  } catch (error) {
    console.error('Error updating user:', error);
    res.status(500).send('Internal Server Error');
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
