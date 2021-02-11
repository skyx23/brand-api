const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const app = express();
dotenv.config();
const routes = require('./routes/routes');
const port = process.env.PORT || 4000;
// connecting to database
mongoose.connect(
  process.env.CONNECTION_URI,
  { useNewUrlParser: true, useUnifiedTopology: true },
  (err,done) =>{
  if(err) {
    console.log('could not connect' , err)
  }else{
    console.log('connected')
  }
  }  
);
// middleware
app.use(express.json());
//routing
app.use('/brand', routes);
// server setup
app.listen(port, () => {
  console.log(`server setup on port ${port}`);
});
