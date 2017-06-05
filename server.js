const express = require('express');
const server = express();
const path = require('path');
const templates = '/app/templates/';

server.get('/', function (req, res) { 
	res.sendFile(path.join(__dirname + templates + 'index.html')); 
});

server.get('/events', function (req, res, next) {
	res.sendFile(path.join(__dirname + templates + 'events.html'));
});

server.use(express.static('public'));

server.use(function (req, res, next) {
	res.status(404).sendFile(path.join(__dirname + templates + '404.html'));
}); 

server.listen(3000, function () { 
	console.log('The server is running on port 3000') 
});