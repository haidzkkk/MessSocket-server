const express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
const passport = require("passport");

var cors = require("cors");
var exphbs = require('express-handlebars');
var dotenv = require("dotenv");

var session = require('express-session')

var indexRouter = require('./src/routes/dashboard.js');
var authRouter = require('./src/routes/auth.js');
var roomRouter = require('./src/routes/room');
var messageRouter = require('./src/routes/message');
var uploadRouter = require('./src/routes/upload');
var adminRouter = require('./src/routes/admin.js');
const socketController = require('./src/controllers/socket');
var notificationRouter = require('./src/routes/notification.js')

dotenv.config();
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'src/views'));

app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());


app.use(session({
    secret: 'DATN',
    resave: false,
    saveUninitialized: true,
    cookie: {
        secure: false,
        maxAge: 30 * 60 * 1000 // Thời gian hết hạn cho phiên (30 phút)
    }
}))
app.use(passport.initialize());
app.use(passport.session());



app.use('/home', indexRouter);
app.use('/admin', adminRouter);
app.use('/api', authRouter);
app.use('/api', roomRouter);
app.use('/api', messageRouter);
app.use('/api', uploadRouter);
app.use('/api', notificationRouter);
socketController.initializeSocketServer()
app.listen(process.env.PORT, async () =>{
  await mongoose.connect(process.env.URL_MONGO, { useNewUrlParser: true, useUnifiedTopology: true })
  console.log(`server running on: http://localhost:3000`)
})

module.exports = app;
