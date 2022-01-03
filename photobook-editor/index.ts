import * as Path from 'path';
import { app, screen, BrowserWindow, ipcMain } from 'electron';

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

	print = (window: BrowserWindow, pxPerCm: number) => {
		const options = {
			silent: true,
			printBackground: true,
			margin: {
				marginType: 'custom',
				top: pxPerCm,
				left: pxPerCm,
				right: pxPerCm,
				bottom: pxPerCm
			},
			landscape: true,
			pagesPerSheet: 1,
			copies: 1
		}

		window.webContents.print(options, (success, failureReason) => {
			if (!success) { console.log(failureReason); }

			console.log('Print Initiated');
		});
	};

	createWindow = () => {
		const dimensions = screen.getPrimaryDisplay().workAreaSize;
		let mainWindow = new BrowserWindow({
			width: dimensions.width,
			height: dimensions.height,
			autoHideMenuBar: true,
			icon: Path.join(__dirname, 'Resources/Img/appIcon.png'),
			webPreferences: {
				contextIsolation: true,
				preload: Path.join(__dirname, 'preload.js'),
			}
		});
		mainWindow.on('close', () => {
			this.server.stop();
		});
		mainWindow.on('closed', () => {
			mainWindow = null;
		});
		ipcMain.on('print', (event, pxPerCm) => {
			this.print(mainWindow, pxPerCm);
		});
		// mainWindow.webContents.openDevTools();
		mainWindow.loadURL(`http://localhost:${APP_PORT}`);
	}
}

new App();
