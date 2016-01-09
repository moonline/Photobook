/// <reference path="./Declarations/node/node.d.ts" />
/// <reference path="./Declarations/express/express.d.ts" />
/// <reference path="./Declarations/body-parser/body-parser.d.ts" />
/// <reference path="./Declarations/mime/mime.d.ts" />
/// <reference path="./Declarations/easyimage/easyimage.d.ts" />
// thanks @ https://github.com/DefinitelyTyped/DefinitelyTyped

import FS = require('fs');
import Path = require('path');
import Express = require('express');
import BodyParser = require('body-parser');
import Mime = require('mime');
import EasyImage = require('easyimage');

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


app.get('/api/image', function(request, response){
	if (request.query.path) {
		var imagePath = request.query.path;

		FS.stat(imagePath, function(error: any, imageStatistics: any) {
			if(error) {
				response.status(400).send('Image not found!');
			} else {
				var thumbnailDirectoryPath = Path.join(Path.dirname(imagePath), configuration.thumbnail.directory);

				FS.stat(thumbnailDirectoryPath, function(error, thumbnailDirectoryStatistics) {
					if(error) { FS.mkdirSync(thumbnailDirectoryPath); }

					var thumbnailPath = Path.join(thumbnailDirectoryPath, Path.basename(imagePath));

					FS.stat(thumbnailPath, function(error, thumbnailStatistics) {
						if(error) {
							var thumbnailConfiguration: any = {
								src: imagePath,
								dst: thumbnailPath,
								width: request.query.size || configuration.thumbnail.size
							};
							EasyImage.resize(thumbnailConfiguration).then(function (error, stdout, stderr) {
									if (error) {
										console.error(error);
									}
									response.writeHead(200, { 'Content-Type': Mime.lookup(thumbnailPath) });
									response.end(FS.readFileSync(thumbnailPath), 'binary');
							});
						} else {
							response.writeHead(200, { 'Content-Type': Mime.lookup(thumbnailPath) });
							response.end(FS.readFileSync(thumbnailPath), 'binary');
						}
					});
				});
			}
		});
	} else {
		response.status(400).send('Path missing!');
	}
});


/**
 * Server start
 */
var appPort = 8080;
app.listen(appPort);
console.log('Server running on port '+appPort);
