var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var home = require('./src/routes/home');
var order = require('./src/routes/order');
var swaggerJSDoc = require('swagger-jsdoc');
var app = express();
var swaggerDefinition = {
  info: {
    title: 'Order-Service',
    version: '1.0.0',
    description: 'Order Service in Node JS',
  },
  host: 'localhost:8085',
  basePath: '/',
};
var options = {
  // import swaggerDefinitions
  swaggerDefinition: swaggerDefinition,
  // path to the API docs
  apis: ['./routes/*.js'],
};
var swaggerSpec = swaggerJSDoc(options);
// serve swagger
app.get('/swagger.json', function(req, res) {
  res.setHeader('Content-Type', 'application/json');
  res.send(swaggerSpec);
});
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', home);
app.use('/order', order);		


app.set('port', 8085);

var server = app.listen(app.get('port'), function() {
  console.log('Express server listening on port ' + server.address().port);
});
