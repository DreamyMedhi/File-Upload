

// var mongoose = require('mongoose');
// mongoose.connect('mongodb://localhost:27017/inshare', {useNewUrlParser: true});
// var conn = mongoose.connection;
// conn.on('connected', function() {
//     console.log('database is connected successfully');
// });
// conn.on('disconnected',function(){
//     console.log('database is disconnected successfully');
// })
// conn.on('error', console.error.bind(console, 'connection error:'));
// module.exports = conn;


// require('dotenv').config();//this will allow us to access all the variables that we write inside .env
// //we will write all our passwords etc in .env and then import it in this file so as to keep it secure and not allow everyone to see set it


import mongoose from 'mongoose';
import dotenv from "dotenv";

dotenv.config();
const connectDB = async () => {
  const conn = await mongoose.connect(process.env.MONGODB_URL, {
      useNewUrlParser:true,
  });
  console.log(`MongoDB Connected: ${conn.connection.host}`)
}

export default connectDB;

