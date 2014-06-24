"use strict";

//
// server.js
//
var express          = require('express');
var path             = require('path');
var favicon          = require('static-favicon');
var cookieParser     = require('cookie-parser');
var methodOverride   = require('method-override');
var bodyParser       = require('body-parser');
var session          = require('express-session');
var RedisStore       = require('connect-redis')(session);
var st               = require('st');
var routes           = require('./app/routes');
var config           = require('config');
var passport         = require('passport');
var log4js           = require('log4js');
var mongoose         = require('mongoose');
var expressValidator = require('express-validator');
var logger;
var app = express();

//
// passport
//
require('./app/helpers/passport_helper')(passport);

//
// mongoose
//
var connect = function() {
  mongoose.connect(config.mongoose.db, config.mongoose.options);
};
connect();

mongoose.connection.on('error', function(err) {
  console.error(err);
});
mongoose.connection.on('disconnected', function() {
  console.log('disconnected mongoose');
  connect();
});

// setup view engine
app.set('views', path.join(__dirname, 'app/views'));
app.set('view engine', 'jade');

//
// log format
//
var logFormat= ":remote-addr - - " +
  ' ":method :url HTTP/:http-version"' + 
  ' :status :content-length ":referrer"' + 
  ' ":user-agent"' +
  ' ":response-time ms"';
var logOpts = {format: logFormat};
log4js.configure(require('./config/log4js.json'));

logger = log4js.getLogger('app');
if (app.get('env') === 'production') {
  logOpts.level = 'auto';
} else {
  logOpts.level = log4js.levels.INFO;
}
app.use(log4js.connectLogger(logger, logOpts));

//
// express middleware
//
app.use(methodOverride());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
app.use(expressValidator([]));

// session
var redis = new RedisStore(config.redis.session);
redis.on('disconnect', function() {
  console.error("Disconnect redis");
});

app.use(session({
  store: redis,
  resave: true,
  saveUninitialized: true,
  secret: config.session.salt
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(favicon());

//
// disable
//
app.disable('x-powered-by');
app.disable('etag'); // TODO: 扱い方をあとで

//
// static file path
//
app.use(st({path: __dirname + '/public', url: '/public'}));

//
// swagger
//
if (app.get('env') === 'development') {
  app.use(require('./app/routes/swagger')(app));
}

//
// router
//
app.use(routes());

module.exports = app;
