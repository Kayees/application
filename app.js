var express = require('express')
mongoose = require('mongoose')
bodyParser = require('body-parser')
Book = require('./models/bookModel');
bookRouter = require('./Router/Router')(Book);


var db=mongoose.connect('mongodb://localhost/bookApi');

var app = express();

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

app.use('/api', bookRouter);

var port = process.env.PORT || 3000;


app.listen(port, function(){
  console.log('listening on port : ' +port);

});