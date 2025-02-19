const express = require('express');
const mongoose = require('mongoose');
const app = express();

mongoose.connect('mongodb+srv://rkasra18:920771018@cluster0.o5y10.mongodb.net/userdb')
    .then(() => {
        console.log('MongoDB connected');
    })
    .catch(err => {
        console.log('Error connecting to MongoDB:', err);
    });

// مسیر روت اصلی
app.get('/', (req, res) => {
    res.send('Hello, World!');
});

const UserSchema = new mongoose.Schema({
    name: String,
    age: Number
});

const UserModel = mongoose.model("emp", UserSchema);

// استفاده از متغیر محیطی برای پورت
const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
