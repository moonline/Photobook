const { app, BrowserWindow, Menu } = require('electron');
require('electron-reload')(__dirname);
const path = require('path');
const url = require('url');

let currentWindow;

const windowConfiguration = {
	width: 1280,
	height: 720,
	icon: path.join(__dirname, './public/images/appIcon-128.png')
};

app.on('ready', function() {
	currentWindow = new BrowserWindow(windowConfiguration);
	currentWindow.loadURL(url.format({
	pathname: path.join(__dirname, './build/index.html'),
		protocol: 'file:',
		slashes: true
	}));

	currentWindow.on('closed', () => {
		currentWindow = null;
	});

	Menu.setApplicationMenu(null);
});

app.on('window-all-closed', () => {
    app.quit()
});
