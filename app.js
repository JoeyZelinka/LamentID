const dotenv = require('dotenv')
dotenv.config()
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const logger = require('morgan');
const db = require('./models')
const scan = require('./reddit_script/script')
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const store = new SequelizeStore({ db: db.sequelize})
store.sync();

// one
const projectRouter = require('./routes/project');
// many
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const projectsRouter = require('./routes/projects');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(
  session({
    secret: 'LamentIdSessionSecret', //used to sign the cookie
    resave: false, //update session even with no changes
    saveUninitialized: true, //always create a session
    cookie: {
      secure: false,
      maxAge: 2592000 //time in seconds
    },
    store: store
  })
)
app.use(express.static(path.join(__dirname, 'client/build')));


// one
app.use('/api/v1/project', projectRouter);
// many
app.use('/', indexRouter);
app.use('/api/v1/users', usersRouter);
app.use('/api/v1/projects', projectsRouter);

// run script
if(process.env.ENABLE_SCAN){
  scan()
}

module.exports = app;
