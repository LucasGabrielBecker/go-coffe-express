var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var gosRouter = require('./routes/gos')
var authRouter = require('./routes/auth')
var authController = require('./controllers/auth.controller')

var app = express();

mongoose.connect('mongodb://localhost:27017/go-coffe-express', {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex:true,  useFindAndModify: false});


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/gos', gosRouter)
app.use('/auth', authRouter)

app.listen(3000, ()=>console.log('App running on http://localhost:3000'))
