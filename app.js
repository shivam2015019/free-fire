var express = require("express");
var app = express();
var router = express.Router();
var path = __dirname + '/views/';
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname+'/static'));


var mongoose = require("mongoose");
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
   console.log("we are connected");
});

mongoose.connect('mongodb://localhost/suggest', {useNewUrlParser: true});

router.use(function (req,res,next) {
  console.log("/" + req.method);
  next();
 });
 var nameSchema = new mongoose.Schema({
     name: String,
     lastname: String,  
      number: String,
     email: String,
     text: String,
    });
    var contact = mongoose.model("contact", nameSchema);

router.get("/",function(req,res){
  res.sendFile(path + "index.html");
});

router.get("/about",function(req,res){
  res.sendFile(path + "aboutus.html");
});

router.get("/contact",function(req,res){
  res.sendFile(path + "contact.html");
});

app.post("/contact", (req, res) => {
  var myData = new contact(req.body);
  myData.save()
    .then(item => {
    res.sendFile(path + "contact2.html");
    })
    .catch(err => {
    res.status(400).send("unable to save to database");
  });
});
app.use("/",router);

app.use("*",function(req,res){
  res.sendFile(path + "404.html");
});

app.listen(3000,function(){
  console.log("Live at Port 3000");
});