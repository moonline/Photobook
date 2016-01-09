/// <reference path="./Declarations/node/node.d.ts" />
/// <reference path="./Declarations/express/express.d.ts" />
/// <reference path="./Declarations/body-parser/body-parser.d.ts" />
// thanks @ https://github.com/DefinitelyTyped/DefinitelyTyped

import FS = require('fs');
import Path = require('path');
import Express = require('express');
import BodyParser = require('body-parser');

import makeDirectoryRecursive = require('./Helper/FileHelper');

var configuration: any = JSON.parse(FS.readFileSync('./config.json', 'utf8'));


var allowCrossDomain = function(request: any, response: any, next: any) {
	response.header('Access-Control-Allow-Origin', '*');
	response.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
	response.header('Access-Control-Allow-Headers', 'Content-Type');
	next();
};


makeDirectoryRecursive(configuration.imagesCache);


/**
 * Basic server
 */
var app = Express();
app.use(allowCrossDomain);
app.use(BodyParser.json())
//app.use('/', Express.static(__dirname + '/Webapp'));

app.get('/api/images', function(request, response) {
	FS.readdir(configuration.imagesCache, function(error, itemNames) {
		var images = itemNames.filter(function(itemName) {
			return FS.lstatSync(Path.join(configuration.imagesCache, itemName)).isFile() && configuration.imageFormats.indexOf(Path.extname(itemName).substring(1)) >= 0;
		});
		response.json({ images: images });
	});
});



/*app.get('/api/image', function(request, response) {
	if(request.query.path) {
		response.json({ events: events });
	} else {
		response.status(400).send('Path missing.');
	}
});*/


/**
 * Server start
 */
var appPort = 8080;
app.listen(appPort);
console.log('Server running on port '+appPort);
