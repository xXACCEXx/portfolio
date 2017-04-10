var bodyParser = require('body-parser')

var express = require('express');
var hbs = require('hbs');
var app = express();


//	set hbs as engine
app.set('view engine', 'hbs');
app.set('views', './server/views');

//	set static folders
app.use('/css', express.static('./public/css/'));
app.use('/js', express.static('./public/js/'));

app.use(bodyParser.json());

app.use('/', (request, response) => {
	response
		.status(200)
		.render('home.hbs');
});

app.listen(8080);
console.log('Listening on:', 8080);