import { app, screen, BrowserWindow } from 'electron';
import * as Path from 'path';
import AppServer from './server';


const APP_PORT = 8374;

class App {
	server: AppServer;

	constructor() {
		this.server = new AppServer();
		this.server.setup();
		this.server.start(APP_PORT);

		app.whenReady().then(() => {
			this.createWindow();

			// mac
			app.on('activate', () => {
				if (BrowserWindow.getAllWindows().length === 0) {
					this.createWindow();
				}
			});
		});

		app.on('window-all-closed', () => {
			console.log('window-all-closed');
			if (process.platform !== 'darwin') {
				app.quit();
			}
		});
	}

	createWindow = () => {
		const dimensions = screen.getPrimaryDisplay().workAreaSize;
		let mainWindow = new BrowserWindow({
			width: dimensions.width,
			height: dimensions.height,
			autoHideMenuBar: true,
			icon: Path.join(__dirname, 'Resources/Img/appIcon.png'),
			webPreferences: {
				nodeIntegration: true
			}
		});
		mainWindow.on('close', () => {
			this.server.stop();
		});
		mainWindow.on('closed', () => {
			mainWindow = null;
		});
		// mainWindow.webContents.openDevTools();
		mainWindow.loadURL(`http://localhost:${APP_PORT}`);
	}
}

new App();
