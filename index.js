const express = require('express');
const mongoose = require('mongoose');
const app = express();

// اتصال به دیتابیس MongoDB
mongoose.connect('mongodb+srv://rkasra18:920771018@cluster0.o5y10.mongodb.net/userdb', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => {
    console.log('MongoDB connected');
})
.catch((err) => {
    console.log('Error connecting to MongoDB:', err);
});

// تعریف اسکیما و مدل User
const UserSchema = new mongoose.Schema({
    name: String,
    age: Number
});

const UserModel = mongoose.model('User', UserSchema);

// تنظیمات نمایش داده‌ها در صفحه
app.set('view engine', 'ejs');  // استفاده از موتور نمایش ejs

//هرگووووههییییییییییی باشه از اینه

// app.set('views', (./views);
// app.set('views', path.join(, 'views')); // دایرکتوری views
// process.cwd()



// روت برای نمایش داده‌های کاربران
app.get('/', async (req, res) => {
    try {
        // گرفتن همه کاربران از کالکشن users
        const users = await UserModel.find();
        res.render('index', { users });  // ارسال داده‌ها به صفحه index.ejs
    } catch (err) {
        res.status(500).send('Error retrieving users');
    }
});

// راه‌اندازی سرور
app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});


app.get('/', async (req, res) => {
    try {
        // گرفتن همه کاربران از کالکشن users
        const users = await UserModel.find();
        res.render('index', { users });
    } catch (err) {
        console.error("Error fetching users:", err);  // لاگ خطا در سرور
        res.status(500).send('Error retrieving users');
    }
});
