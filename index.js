const express = require('express')
const cors = require('cors')
const conectDB = require('./config/db')
const session = require('express-session')
const passport = require('passport')
const passportSetting = require('./core/settings/passport')
const app = express()
const bodyParser = require('body-parser');


require('./core/settings/passport')
const secureRoute = require('./core/auth/routes/secure-routes')
const routes = require('./core/auth/routes/auth')

conectDB()
app.use(cors())
app.use(express.json())


app.use(session({ secret: 'SECRET', resave: true, saveUninitialized: true }));

app.use(passport.initialize());
app.use(passport.session());

// app.use(bodyParser.urlencoded({ extended: false }));

//Routes
app.use('/api/users', require('./modules/user-module/routes/user'))
app.use('/api/posts', require('./modules/post-module/routes/post'))

//Routes Auth
app.use('/api', routes )
app.use('/user', passportSetting.isAuth, secureRoute);

app.listen(3001)