var FS = require('fs');
var Path = require('path');
var Express = require('express');
var BodyParser = require('body-parser');
var Mime = require('mime');
var EasyImage = require('easyimage');
var ImageSize = require('image-size');
var makeDirectoryRecursive = require('./Helper/FileHelper');
var configuration = JSON.parse(FS.readFileSync('./config.json', 'utf8'));
var allowCrossDomain = function (request, response, next) {
    response.header('Access-Control-Allow-Origin', '*');
    response.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    response.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
};
makeDirectoryRecursive(configuration.imagesCache);
var app = Express();
app.use(allowCrossDomain);
app.use(BodyParser.json());
app.use('/', Express.static(__dirname + '/Webapp'));
function respondImage(response, imagePath) {
    response.writeHead(200, { 'Content-Type': Mime.lookup(imagePath) });
    response.end(FS.readFileSync(imagePath), 'binary');
}
function renderAndReturnThumbnail(imagePath, thumbnailPath, thumbnailSize, response) {
    var thumbnailConfiguration = {
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
app.get('/api/image', function (request, response) {
    if (request.query.path) {
        var imagePath = (request.query.path.indexOf('file://') === 0) ? request.query.path.substring(7) : request.query.path;
        FS.stat(imagePath, function (error, imageStatistics) {
            if (error) {
                response.status(400).send('Image not found!');
            }
            else {
                var thumbnailDirectoryPath = Path.join(Path.dirname(imagePath), configuration.thumbnail.directory);
                FS.stat(thumbnailDirectoryPath, function (error, thumbnailDirectoryStatistics) {
                    if (error) {
                        FS.mkdirSync(thumbnailDirectoryPath);
                    }
                    var thumbnailPath = Path.join(thumbnailDirectoryPath, Path.basename(imagePath));
                    var thumbnailSize = request.query.size || configuration.thumbnail.size;
                    FS.stat(thumbnailPath, function (error, thumbnailStatistics) {
                        if (error) {
                            renderAndReturnThumbnail(imagePath, thumbnailPath, thumbnailSize, response);
                        }
                        else {
                            ImageSize(thumbnailPath, function (error, dimensions) {
                                if (dimensions.width != thumbnailSize) {
                                    renderAndReturnThumbnail(imagePath, thumbnailPath, thumbnailSize, response);
                                }
                            });
                            respondImage(response, thumbnailPath);
                        }
                    });
                });
            }
        });
    }
    else {
        response.status(400).send('Path missing!');
    }
});
var appPort = 8080;
app.listen(appPort);
console.log('Server running on port ' + appPort);
