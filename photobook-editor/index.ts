import * as OS from 'os';
import * as Path from 'path';
import * as FS from 'fs';
import * as Open from 'open';
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

	print = (window: BrowserWindow, numberOfPages: number) => {
		// https://www.electronjs.org/docs/latest/api/web-contents#contentsprinttopdfoptions
		const pdfOptions = {
			landscape: true,
			marginsType: 1,
			pageSize: 'A4',
			scaleFactor: 100,
			printBackground: true,
			pageRanges: {
				from: 0,
				// exclude empty tailer page
				to: numberOfPages - 1
			}
		};

		const pdfPath = Path.join(OS.homedir(), 'PDF', 'photobook.pdf')
		window.webContents.printToPDF(pdfOptions).then(data => {
			FS.writeFile(
				pdfPath,
				data,
				(error) => {
					if (error) {
						throw error;
					} else {
						Open(pdfPath);
						console.info(`Wrote PDF successfully to ${pdfPath}`);
					}
				}
			)
		}).catch(error => {
			console.error(`Failed to write PDF to ${pdfPath}: `, error)
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
		ipcMain.on('print', (event, numberOfPages) => {
			this.print(mainWindow, numberOfPages);
		});
		// mainWindow.webContents.openDevTools();
		mainWindow.loadURL(`http://localhost:${APP_PORT}`);
	}
}

new App();
