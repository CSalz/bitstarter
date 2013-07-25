var express = require('express');
var app = express();
var fs = require('fs');
var path = require('path');

app.use(express.logger());

app.get('/', function(request, response) {

    var lookup = path.basename(decodeURI(request.url)) ||'index.html', f = lookup;
  
    fs.exists(f,function (exists) {
	if (exists) {
	    fs.readFile(f, function (err, data) {
		if (err) {
		    response.writeHead(500);
		    response.end('Server Error!') 
		    return;
		}
		var headers = {'Content-Type': 'text.html'}
		response.writeHead(200 , {'Content-Type': 'text/html'});
		response.end(data);
	    })
	    return;
	}
	response.writeHead(404); // no file
	response.end('No Page');
    });
});


var port = process.env.PORT || 5000;
app.listen(port, function() {
  console.log("Listening on " + port);
});