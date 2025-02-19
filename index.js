const express = require('express');
const mongoose = require('mongoose');
const app = express();


console.log("Server is running...");


mongoose.connect('mongodb+srv://rkasra18:920771018@cluster0.o5y10.mongodb.net/userdb')
    .then(() => {
        console.log('MongoDB connected');
    })
    .catch(err => {
        console.log('Error connecting to MongoDB:', err);
    });

    mongoose.connection.on('connected', () => {
        console.log('Mongoose is connected to the database');
    });
    
    mongoose.connection.on('error', (err) => {
        console.log('Mongoose connection error:', err);
    });
    
    mongoose.connection.on('disconnected', () => {
        console.log('Mongoose is disconnected');
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


app.get('/userdb', async (req, res) => {
    try {
        const users = await UserModel.find();
        res.json(users);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching data from database', error: err });
    }
});
