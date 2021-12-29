import { app, screen, BrowserWindow } from 'electron';
import * as Path from 'path';
import AppServer from './server';


const APP_PORT = 8374;

const server = new AppServer();
server.setup();
server.start(8080);

class App {
	server: AppServer;

	constructor() {
		this.server = new AppServer();
		server.setup();
		server.start(APP_PORT);

		app.whenReady().then(() => {
			this.createWindow();

			// mac
			app.on('activate', function () {
				if (BrowserWindow.getAllWindows().length === 0) {
					this.createWindow();
				}
			});
		});

		app.on('window-all-closed', function () {
			// TODO fix
			this.server.stop();
			app.quit();
		});
	}

	createWindow = () => {
		const dimensions = screen.getPrimaryDisplay().workAreaSize;
		const mainWindow = new BrowserWindow({
			width: dimensions.width,
			height: dimensions.height,
			icon: Path.join(__dirname, 'Resources/Img/appIcon.png')
		});
		mainWindow.setMenu(null);
		// TODO remove
		mainWindow.webContents.openDevTools();
		mainWindow.loadURL(`http://localhost:${APP_PORT}`);
	}
}

new App();
