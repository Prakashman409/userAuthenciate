var createError = require('http-errors');
var express = require('express');
var path = require('path');
//var cookieParser = require('cookie-parser');
var logger = require('morgan');


var session=require('express-session');
var fileStore=require('session-file-store')(session)



const mongoose=require('mongoose');
const url='mongodb://basnetprakash:pokhara1998@trafficweb-shard-00-00-tx4n0.mongodb.net:27017,trafficweb-shard-00-01-tx4n0.mongodb.net:27017,trafficweb-shard-00-02-tx4n0.mongodb.net:27017/<dbname>?ssl=true&replicaSet=trafficweb-shard-0&authSource=admin&retryWrites=true&w=majority';
const connect=mongoose.connect(url);

connect.then((db)=>{
  console.log('server connected succesfully');
},(err)=>{
  console.log(err)
},(err)=>{
console.log('err occured');
});



var dishRouter=require('./routes/dishRouter');
var promoRouter=require('./routes/promoRouter');
var leaderRouter=require('./routes/leaderRouter');
var usersRouter = require('./routes/users');
var indexRouter=require('./routes/indexRouter');


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
//app.use(cookieParser('213123-12312-12312312'));

app.use(session({
  name:'session-id',
  secret:'1234-234-234',
  saveUninitialized:false,
  resave:false,
  store:new fileStore()
}));
app.use('/',indexRouter);
app.use('/users', usersRouter);
function auth(req,res,next){
  
  
      if(!req.session.user){
          var err=new Error('you are not authentic');
          res.setHeader('WWW-Authenticate','Basic');
          err.status=401;
          return next(err)
        }else{
          if(req.session.user==='authenticated'){
            next();
          }else{
            var err=new Error('you are not authenticate go ahead');
            err.status=401;
            next(err);
          }
        }
      }
 

app.use(auth)
app.use(express.static(path.join(__dirname, 'public')));




app.use('/dishes',dishRouter);
app.use('/promotions',promoRouter);
app.use('/leaders',leaderRouter);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
