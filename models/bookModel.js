var mongoose = require('mongoose'), 
Schema = mongoose.Schema;


var bookModel = new Schema({
	title:{type : String},
	author :{type:String},
	genre : {type:String},
	read: {type: Boolean, default: false}

},{ versionKey: false });

//the name of the model created / accepted by mongodb would be books
//it appends an 's' to the model name and the model is all in lowercase

module.exports = mongoose.model('BOOK', bookModel);
