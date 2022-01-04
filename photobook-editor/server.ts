
/// <reference path="./declarations/mime/mime.d.ts" />
// thanks @ https://github.com/DefinitelyTyped/DefinitelyTyped

import * as http from 'http';
import * as FS from 'fs';
import * as Path from 'path';
import * as Express from 'express';
import * as BodyParser from 'body-parser';
import * as Mime from 'mime';
import * as EasyImage from 'easyimage';
import * as ImageSize from 'image-size';

import { makeDirectoryRecursive } from './helper/FileHelper';

const configuration: any = JSON.parse(FS.readFileSync(Path.join(__dirname, 'config.json'), 'utf8'));


class AppServer {
	server: Express.Express;
	handle: http.Server;

	constructor() {
		makeDirectoryRecursive(configuration.imagesCache);
	}

	allowCrossDomain = (request: Express.Request, response: Express.Response, next: Express.NextFunction) => {
		response.header('Access-Control-Allow-Origin', '*');
		response.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
		response.header('Access-Control-Allow-Headers', 'Content-Type');
		next();
	};

	respondImage = (response: Express.Response, imagePath: string): void => {
		response.writeHead(200, { 'Content-Type': Mime.lookup(imagePath) });
		response.end(FS.readFileSync(imagePath), 'binary');
	}

	renderAndReturnThumbnail = (imagePath: string, thumbnailPath: string, thumbnailSize: number, response: Express.Response): void => {
		var thumbnailConfiguration: any = {
			src: imagePath,
			dst: thumbnailPath,
			width: thumbnailSize
		};
		// TOOD params
		EasyImage.resize(thumbnailConfiguration).then((error: any, stdout: any, stderr: any) => {
			if (error) {
				console.error(error);
			}
			this.respondImage(response, thumbnailPath);
		});
	}

	setup = () => {
		this.server = Express();
		this.server.use(this.allowCrossDomain);
		this.server.use(BodyParser.json())
		this.server.use('/', Express.static(__dirname + '/src'));

		/**
		 * Server start
		 * const server = new AppServer();
		 * server.setup();
		 * server.start(8080);
		 * ...
		 * server.stop();
		 */
		// TODO params
		this.server.get('/api/image', (request: Express.Request, response: Express.Response) => {
			if (request.query.path) {
				const requestPath: string = String(Array.isArray(request.query.path) ? request.query.path[0] : request.query.path);
				// legacy support for old photobooks
				const imagePath: string = (requestPath.indexOf('file://') === 0) ? requestPath.replace('file://', '') : requestPath;

				FS.stat(imagePath, (error: any, imageStatistics: any) => {
					if (error) {
						response.status(400).send('Image not found!');
					} else {
						var thumbnailDirectoryPath = Path.join(Path.dirname(imagePath), configuration.thumbnail.directory);

						FS.stat(thumbnailDirectoryPath, (error, thumbnailDirectoryStatistics) => {
							if (error) { FS.mkdirSync(thumbnailDirectoryPath); }

							var thumbnailPath = Path.join(thumbnailDirectoryPath, Path.basename(imagePath));
							var thumbnailSize = request.query.size || configuration.thumbnail.size;

							FS.stat(thumbnailPath, (error, thumbnailStatistics) => {
								if (error) {
									this.renderAndReturnThumbnail(imagePath, thumbnailPath, thumbnailSize, response)
								} else {
									// TODO params
									ImageSize(thumbnailPath, (error: any, dimensions: any) => {
										if (dimensions.width != thumbnailSize) {
											this.renderAndReturnThumbnail(imagePath, thumbnailPath, thumbnailSize, response);
										}
									});
									this.respondImage(response, thumbnailPath);
								}
							});
						});
					}
				});
			} else {
				response.status(400).send('Path missing!');
			}
		});
	}

	start = (port: number = 8562) => {
		this.handle = this.server.listen(port);
		console.info(`Server started at port ${port}`)
	}

	stop = () => {
		this.handle.close();
		console.info('Server stopped');
	}
}

export default AppServer;