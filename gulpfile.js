var gulp = require('gulp');
var nodemon = require('gulp-nodemon');
var env = require('gulp-env');



gulp.task('default' , function(){
   
     nodemon({

     	script: 'app.js',
     	ext: 'js',
     	env: {
     		PORT :8090, 'NODE_ENV': 'development' 
     	},
     	ignore: ['./node_modules/**']
     
     	
     }).on('restart', function(){
         console.log('gulp has restarted');
     });
});


