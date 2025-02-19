const express = require('express')
const mongoose = require('mongoose')
const app = express()

mongoose.connect('mongodb+srv://rkasra18:920771018@cluster0.o5y10.mongodb.net/userdb')

.then(() => {
    console.log('MongoDB connected'); // پیام موفقیت در اتصال
})
.catch(err => {
    console.log('Error connecting to MongoDB:', err); // پیام خطا در اتصال
});


// مسیر روت اصلی
app.get('/', (req, res) => {
    res.send('Hello, World!'); // یا می‌توانید فایل HTML یا یک صفحه دیگر ارسال کنید
});


 const   UserSchema = new mongoose.Schema({

     name:String,
     age:Number
 })

 const UserModel = mongoose.model("emp", UserSchema);

app.listen (80, ()=>{
    console.log('server is running.')
})

