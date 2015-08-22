var express = require('express');

var routes = function(Book){

var bookRouter = express.Router();

bookRouter.route("/Books")
    .post(function(req,res){

       var book = new Book(req.body);

      book.save();

       res.status(201).send(book);
    })
    .get(function(req, res){     
        var query = {};
       if(req.query.genre){      
         query.genre = req.query.genre;
       }

        Book.find(query,function(err, books){
           res.json(books);
        
      });

});

  bookRouter.route("/Books/:BookId")
  .get(function(req, res){  
   

    Book.findById(req.params.BookId,function(err, book){
       res.json(book);
      
    });
  });

  bookRouter.route("/")
  .get(function(req,res){

     res.send("Welcome to the API Building");
  });

   return bookRouter;

}



module.exports = routes;