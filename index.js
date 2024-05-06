/*
---------------------------
what we need to instal
---------------------------
*express.js(npm i express)
*mongoose(npm i momgoose)
*nodemon (npm i nodemon -g)
*dotenv(npm i dotenv)
*body-parser(npm i body-paser)
*bcrypt(npm i bcrypt)
*jsonwebtoken(npm i jsonwebtoken) 
*/


const express = require('express');
const mongoose = require('mongoose');

require('dotenv').config();
const port = process.env.SERVER_PORT || 3000;

//const customerRoute = require('./route/CustomerRoute');
const userRoute = require('./route/userRoute');
const bodyParser = require('body-parser');

const app = express(); // <-- Invoke express() to create an instance of the Express application


// create application/json parser
app.use( bodyParser.json())

// create application/x-www-form-urlencoded parser
app.use(  bodyParser.urlencoded({ extended: false }))

mongoose.connect('mongodb://127.0.0.1:27017/node_react_pos')
  .then(() => {
    app.listen(port, () => {
      console.log(`API started & running on port ${port}`);
    });
  })
  .catch(error => {
    console.error("MongoDB connection error:", error);
  });

//   app.use('/',(req,resp,next)=>{
//     resp.send('<h1>Server works</h1>');
//   });

  //app.use('/api/v1/customers',customerRoute);
  app.use('/api/v1/users',userRoute);