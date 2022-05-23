const express = require('express')
const cors = require('cors')
const conectDB = require('./config/db')
const session = require('express-session')
const passport = require('passport')
const passportSetting = require('./core/settings/passport')
const app = express()
// const bodyParser = require('body-parser');


require('./core/settings/passport')
const secureRoute = require('./core/auth/routes/secure-routes')
const routes = require('./core/auth/routes/auth')

conectDB()
app.use(cors())
// app.use(cors({origin: true, credentials: true, methods: 'POST, GET, PUT, OPTIONS, DELETE'}));
app.use(express.json())


app.use(session({ 
  secret: 'TOP_SECRET',
  resave: true, 
  saveUninitialized: true,
  cookie: {maxAge: 1800 * 1000}
}
)); //cookie autologout dopo 30 minuti da perfezionare con token

app.use(passport.initialize());
app.use(passport.session());

// app.use(bodyParser.urlencoded({ extended: false }));

//Routes
app.use('/api/users', require('./modules/user-module/routes/user'))
app.use('/api/posts', require('./modules/post-module/routes/post'))

//Routes Auth
app.use('/api', routes )
app.use('/user', passportSetting.isAuth, secureRoute);

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  res.header("Access-Control-Allow-Methods", "GET, POST","PUT");
  });

app.listen(3001)