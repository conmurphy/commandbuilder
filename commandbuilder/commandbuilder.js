var express = require('express');
var bodyParser = require('body-parser');
var app     = express();
var path = require('path');
var traverse = require('./traverse');

var port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: true })); 
app.use(bodyParser.json());

app.get('/', function (req, res) {
	app.use(express.static(__dirname + '/public'));
  	res.sendFile(path.join(__dirname + '/index.html'))
})

app.post('/validate', function(req, res) {
  	var vars = traverse['buildTree'](req.body);

  	res.send(vars);
});

app.listen(port, function() {
  	console.log('Server running...');
});
