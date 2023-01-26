var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var models = require('./models')
var db = require('./utils/database')

var indexRouter = require('./routes/index');
var personsRouter = require('./routes/persons');
var usersRouter = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/persons', personsRouter);
app.use('/users', usersRouter);

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

db.authenticate().then(() => {
  console.log('✅ Connection has been established successfully.');
}).catch((error) => {
  console.error('❌ Unable to connect to the database: ', error);
});

const eraseDatabaseOnSync = true;

// Sync database — force: true means, it will drop table if it exists
db.sync({ force: eraseDatabaseOnSync }).then(async () => {
  if (eraseDatabaseOnSync) {
    // Seed data
    await models.Person.bulkCreate(
      [
        { name: 'Emily', address: '2 Willow Lane' },
        { name: 'Haley', address: '2 Willow Lane' },
        { name: 'Lewis', address: 'Mayor\'s Manor' }
      ]
    );
    console.log('✨ Persons table created successfully!');
  }
  console.log('✨ Sync successful!');
}).catch((error) => {
  console.error('Unable to sync : ', error);
});

module.exports = app;
