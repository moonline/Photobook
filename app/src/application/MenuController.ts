import { remote } from 'electron';
const { Menu, dialog } = remote;

import * as FS from 'fs';
import * as Path from 'path';

import { loadFromFile, writeFile } from '../service/File';

import { PhotoBook as PhotoBookInterface } from '../domain/dto/PhotoBook';
import { PhotoBook as PhotoBookModel } from '../domain/model/PhotoBook';
import { RootStore } from '../domain/store/RootStore';


export class MenuController {
    private store: RootStore;
    private lastOpenedFile: string = null;

    constructor(store: RootStore) {
        this.store = store;

        const menu = this.createMenu();
        Menu.setApplicationMenu(menu);

        this.open = this.open.bind(this);
        this.save = this.save.bind(this);
        this.saveAs = this.saveAs.bind(this);
        this.print = this.print.bind(this);
        this.openFile = this.openFile.bind(this);
    }

    private open() {
        dialog.showOpenDialog(
            {
                filters: [{ name: 'PhotoBook Files', extensions: ['json', 'pbjson' ] }],
                properties: ['openFile']
            },
            (filePaths) => {
                if (filePaths && filePaths.length > 0 && filePaths[0]) {
                    this.lastOpenedFile = filePaths[0];
                    this.openFile(filePaths[0]);
                } else {
                    console.error('no valid file');
                }
            }
        );
    }

    private openFile(fileName: string) {
		try {
			loadFromFile(fileName, (photoBookDto: PhotoBookInterface) => {
				const photoBook: PhotoBookModel = PhotoBookModel.createFromDto(photoBookDto, fileName);
				const thumbnailDirectory = photoBook.thumbnailDirectory;
				if (thumbnailDirectory && !FS.existsSync(thumbnailDirectory)) {
					FS.mkdirSync(thumbnailDirectory);
				}
				this.store.photoBookStore.import(photoBook);
			});
		} catch (e) {
			console.error(e);
		}
    }

    private print() {
        window.print();
    }

    private save() {
        const fileName = this.store.photoBookStore.photoBook.path;
        const fileContent = this.store.photoBookStore.export();
        try {
            writeFile(fileName, fileContent, () => {
                console.log(`Saved to ${fileName}`);
            });
        } catch (e) {
            console.error(e);
        }
    }

    private saveAs() {
        const originalFileName = this.store.photoBookStore.photoBook.path;
        dialog.showOpenDialog({
            defaultPath: Path.dirname(originalFileName),
            filters: [
                { name: 'JSON files', extensions: ['json'] }
            ],
            properties: ['openFile'],
            title: 'Save as'
        }, (filePaths: string[]) => {
            if (filePaths[0]) {
                const fileContent = this.store.photoBookStore.export();
                try {
                    writeFile(filePaths[0], fileContent, () => {
                        console.log(`Saved to ${filePaths[0]}`);
                    });
                } catch (e) {
                    console.error(e);
                }
            } else {
                console.log('No file choosen');
            }
        });
    }

    private createMenu() {
        return Menu.buildFromTemplate([
            {
                label: 'File',
                submenu: [
                    {
                        label: 'Open',
                        click: () => { this.open(); }
                    },
                    {
                        label: 'Print',
                        click: () => { this.print(); }
                    },
                    {
                        label: 'Save',
                        click: () => { this.save(); }
                    },
                    {
                        label: 'Save as',
                        click: () => { this.saveAs(); }
                    }
                ]
            },
            {
                label: 'View',
                submenu: [
                    { role: 'reload' },
                    { role: 'toggledevtools' },
                    { type: 'separator' },
                    { role: 'resetzoom' },
                    { role: 'zoomin' },
                    { role: 'zoomout' },
                    { type: 'separator' },
                    { role: 'togglefullscreen' }
                ]
            }
        ]);
    }
}
