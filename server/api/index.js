const express = require("express");
const cors = require("cors");
const proxy = require('express-http-proxy')

const app = express();

app.use(express.json())

const config = require('./config')
const allowedOrigins = config.ALLOWED;

app.use(cors({
  origin: function(origin, callback) {
    if (!origin) return callback(null, true); // allow requests with no origin
    if (allowedOrigins.indexOf(origin) === -1) {
      const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  },
}));

const logging = require("./routes/logging")
const account = require("./routes/account")
const graphing = require("./routes/graphing")
const external = require("./routes/external")

app.use('/token', proxy('oauth.fatsecret.com', {
  proxyReqPathResolver: function(req) {
    return '/connect/token';
  },
  proxyReqOptDecorator: function(proxyReqOpts, srcReq) {
    // Add headers to proxy request
    proxyReqOpts.headers['Content-Type'] = 'application/x-www-form-urlencoded';
    proxyReqOpts.headers['Authorization'] = 'Basic ' + Buffer.from('276b633c771249b5ac58c9667edf46df:61d4897fdac94c35940e73d3ba1406c2').toString('base64');
    return proxyReqOpts;
  },
  proxyReqBodyDecorator: function(bodyContent, srcReq) {
    // Modify body content or add new data
    bodyContent.grant_type = 'client_credentials';
    bodyContent.scope = 'basic';
    return bodyContent;
  }
}));

const isLoggedIn = require("./middleware/isLoggedIn")
const notDemo = require("./middleware/notDemo")

app.get('/', (req, res) => {
    res.send('yee yee');
  });

app.post('/login', account.login);
app.post('/available', account.available)
app.post('/register', account.register)
app.get('/preferences', isLoggedIn, account.readPreferences)
app.post('/preferences', [isLoggedIn,notDemo], account.savePreferences)
app.post('/changePassword', [isLoggedIn,notDemo], account.changePassword)

app.get('/history', isLoggedIn, graphing.historyRoute)
app.get('/counter', isLoggedIn, graphing.counterRoute)
app.get('/macros', isLoggedIn, graphing.macroRoute)

app.get('/food', isLoggedIn, logging.readFoodRoute)
app.post('/food', [isLoggedIn,notDemo], logging.addFoodRoute)

app.get('/day', isLoggedIn, logging.readDayRoute)
app.post('/day', [isLoggedIn,notDemo], logging.addDayRoute)


app.listen(5002, () => console.log("connected on 3000"));
   
