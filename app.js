var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose');
var cors = require('cors')
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var gosRouter = require('./routes/gos')
var authRouter = require('./routes/auth')
const promBundle = require("express-prom-bundle");
const metricsMiddleware = promBundle({includeMethod: true});
const rateLimit = require("express-rate-limit");

var app = express();
app.use(require('express-status-monitor')());
app.use(cors())
app.use(metricsMiddleware)
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100
});

app.use(limiter);

   

mongoose.connect('mongodb+srv://dbUser:Lu.30134596@cluster0.jf5ka.mongodb.net/go-coffe-express?retryWrites=true&w=majority', {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex:true,  useFindAndModify: false});


app.use(logger(':method :url :status :res[content-length] - :response-time ms'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/gos', gosRouter)
app.use('/auth', authRouter)

app.listen(3333, ()=>console.log('App running on http://localhost:3333'))
