var express = require('express');
var app = express();
var bodyparser = require('body-parser')
app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());
const dotenv = require('dotenv');

dotenv.config();

const userVerification = require('./middleware/userm')


const user = require('./controllers/user')
const auth = require('./controllers/auth')
const blog = require('./controllers/blog')

app.use('/user', user)
app.use('/auth', auth)
app.use('/blog',[userVerification], blog)


var server = app.listen(8081, function () {
   var host = server.address().address
   var port = server.address().port
   console.log("Example app listening at http://%s:%s", host, port)
});