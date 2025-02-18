const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// تعریف اسکیمای کاربر
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  age: { type: Number },
  city: { type: String },
});

// هش کردن پسورد قبل از ذخیره در دیتابیس
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();

  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// متدی برای مقایسه پسورد هش‌شده
userSchema.methods.comparePassword = function(password) {
  return bcrypt.compare(password, this.password);
};

// ایجاد مدل
const User = mongoose.model('User', userSchema);

module.exports = User;
