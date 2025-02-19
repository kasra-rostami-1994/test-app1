const express = require('express')
const mongoose = require('mongoose')
const app = express()

mongoose.connect('mongodb+srv://rkasra18:920771018@cluster0.o5y10.mongodb.net/userdb')


   const   UserSchema = new mongoose.Schema({

       name:String,
      age:Number
   })

   const UserModel = mongoose.model("test-base-in-creation", UserSchema);

app.listen (3000, ()=>{
    console.log('server is running.')
})

