var bodyParser = require('body-parser')

var express = require('express');
var app = express();
var hbs = require('hbs');

//	set hbs as engine
app.set('view engine', 'hbs');
app.set('views', './server/views');

app.use(bodyParser.json());

app.use('/', (request, response) => {
	response
		.status(200)
		.render('home.hbs');
});

app.listen(8080);
console.log('Listening on:', 8080);