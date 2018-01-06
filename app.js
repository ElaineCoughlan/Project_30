var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var prod =  process.env.NODE_ENV === 'prod';

var index = require('./routes/index.js');
var users = require('./routes/users.js');
var entries = require('./routes/entries');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

if (prod) {
        app.use(express.static(path.join(__dirname, 'dist')));
    } else {
        app.use(express.static(path.join(__dirname, 'build')));
    }  
app.use("/public", express.static(__dirname + "/public"));

app.use('/', index);
app.use('/users', users);

app.get('/entries', entries.findAll);
app.get('/entries/:id',entries.findOne);

app.post('/entries', entries.addEntry);

app.delete('/entries/:id',entries.deleteEntry);

app.put('/entries/:id/Likey',entries.upVote);
app.put('/entries/:id/NoLikey',entries.downVote);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
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
