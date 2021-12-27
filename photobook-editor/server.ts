/// <reference path="./Declarations/node/node.d.ts" />
/// <reference path="./Declarations/express/express.d.ts" />
/// <reference path="./Declarations/body-parser/body-parser.d.ts" />
/// <reference path="./Declarations/mime/mime.d.ts" />
/// <reference path="./Declarations/easyimage/easyimage.d.ts" />
/// <reference path="./Declarations/image-size/image-size.d.ts" />
// thanks @ https://github.com/DefinitelyTyped/DefinitelyTyped

import FS = require('fs');
import Path = require('path');
import Express = require('express');
import BodyParser = require('body-parser');
import Mime = require('mime');
import EasyImage = require('easyimage');
import ImageSize = require('image-size');

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
app.use('/', Express.static(__dirname + '/Webapp'));


function respondImage(response: any, imagePath: string): void {
	response.writeHead(200, { 'Content-Type': Mime.lookup(imagePath) });
	response.end(FS.readFileSync(imagePath), 'binary');
}

function renderAndReturnThumbnail(imagePath: string, thumbnailPath: string, thumbnailSize: number, response: any): void {
	var thumbnailConfiguration: any = {
		src: imagePath,
		dst: thumbnailPath,
		width: thumbnailSize
	};
	EasyImage.resize(thumbnailConfiguration).then(function (error, stdout, stderr) {
			if (error) {
				console.error(error);
			}
			respondImage(response, thumbnailPath);
	});
}


app.get('/api/image', function(request, response){
	if (request.query.path) {
		// legacy support for old photobooks
		var imagePath = (request.query.path.indexOf('file://') === 0) ? request.query.path.substring(7) : request.query.path;

		FS.stat(imagePath, function(error: any, imageStatistics: any) {
			if(error) {
				response.status(400).send('Image not found!');
			} else {
				var thumbnailDirectoryPath = Path.join(Path.dirname(imagePath), configuration.thumbnail.directory);

				FS.stat(thumbnailDirectoryPath, function(error, thumbnailDirectoryStatistics) {
					if(error) { FS.mkdirSync(thumbnailDirectoryPath); }

					var thumbnailPath = Path.join(thumbnailDirectoryPath, Path.basename(imagePath));
					var thumbnailSize = request.query.size || configuration.thumbnail.size;

					FS.stat(thumbnailPath, function(error, thumbnailStatistics) {
						if(error) {
							renderAndReturnThumbnail(imagePath, thumbnailPath, thumbnailSize, response)
						} else {
							ImageSize(thumbnailPath, function(error, dimensions) {
								if(dimensions.width != thumbnailSize) {
									renderAndReturnThumbnail(imagePath, thumbnailPath, thumbnailSize, response);
								}
							});
							respondImage(response, thumbnailPath);
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
