const express=require('express');
const path = require('path');
const bodyParser=require("body-parser");
const cookieParser=require("cookie-parser");
const cors=require("cors");
const port=4000;
var router =express.Router();
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/taindb', {useNewUrlParser: true, useUnifiedTopology: true});


const db =mongoose.connection;
db.on('error', console.error.bind(console, 'error connecting to db'));
db.once('open', function() {
  console.log('Successfully Connected to the database');
});

const Contact = require('./models/user');
const signup = require('./routes/signup');
const signin = require('./routes/signup');
const registration=require('./routes/signup');
const app=express();


 var x12='./Registrationform/image/t1.jpg'; 

app.use(express.static(path.join(__dirname,"./Login-signup")));
app.use(express.static(path.join(__dirname,"./Registrationform")));
app.use(express.static(path.join(__dirname,"./homepage")));
 app.use(bodyParser());
 app.use(cookieParser());
 app.use(cors());
  app.use(express.urlencoded());
  // app.use(express.static("public"));
  app.get('/',function(req,res)
  {
      res.sendFile(path.join(__dirname,"homepage","index.html"));
      // res.sendFile(__dirname + "/"+"bootstrap"+"/" + "css"+"/"+"book-now.css");
  });
// app.get('/',function(req,res)
// {
//     res.sendFile(path.join(__dirname,"Login-signup","login.html"));
//     res.sendFile(__dirname + "/"+"Login-signup"+"/" + "login.css");
// });
app.get('/register',function(req,res){
  res.sendFile(path.join(__dirname,"Registrationform","registration.html"));
  res.sendFile(path.join(__dirname,x12));
  
});
app.use("/",registration);
 app.use("/",signup);  
 app.use("/",signin);
app.listen(port,function(err)
{
    if(err)
    {
        console.log('Error',err);
        return;
    }
    console.log('Express server is running up on port',port);
})