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

//this is a middleware , we had the findbyid in  our get and put request we want it to be in only one place so introducing
// a middleware which would do the needful and forward the request , think of this like an interceptor
 bookRouter.use("/Books/:BookId", function(req, res, next){

   Book.findById(req.params.BookId,function(err, book){
       if(err){
        res.status(500).send(err);
       } else if(book){

        req.book = book;
        next();
       } else {

        res.status(404).send("no book found.");
       }
      
     })
   });


  bookRouter.route("/Books/:BookId")
  .get(function(req, res){  
       res.json(req.book);      
   
  })
 .put(function(req, res){  
     req.book.title = req.body.title;
     req.book.author = req.body.author;
     req.book.genre = req.body.genre;
     req.book.read = req.body.read;
     req.book.save(function(err){
           if(err) 
             res.status(500).send(err);
           else
             res.json(req.book);  
     });       
   
  })
 .patch(function(req,res){
  
   if(req.body._id)
     delete req.body._id;

   for(var p in req.body){
    req.book[p]  = req.body[p];
   }

   req.book.save(function(err){

   if(err) 
       res.status(500).send(err);
     else
       res.json(req.book);  
     });
 })

 .delete(function(req,res){
   req.book.remove(function(err){

   if(err) 
       res.status(500).send(err);
     else
       res.json(req.book);  
     });
 });

  bookRouter.route("/")
  .get(function(req,res){

     res.send("Welcome to the API Building");
  });

   return bookRouter;

}

module.exports = routes;