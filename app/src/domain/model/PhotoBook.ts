import * as Path from 'path';

import { PhotoBook as PhotoBookInterface } from '../dto/PhotoBook';

import { Page } from './Page';

import { THUMBNAIL_DIRECTORY } from '../../config/app';


export enum BookType {
	SinglePage
}


export class PhotoBook {
	public static createFromDto(dto: PhotoBookInterface, path: string): PhotoBook {
		return new PhotoBook(path, dto.pages.map(Page.createFromDto));
	}

	// absolute path to the photobook file
	public readonly path: string;
	public pages: Page[];
	public readonly type: BookType;

	// get absolute directory path of the photobook file
	get directory(): string {
		return Path.dirname(this.path);
	}

	// get absolute directory path of the thumbnail directory
	get thumbnailDirectory(): string {
		return Path.join(this.directory, THUMBNAIL_DIRECTORY);
	}

	// get file name without extension
	get name(): string {
		return Path.basename(this.path, Path.extname(this.path));
	}


	constructor(path: string, pages: Page[] = [], type: BookType = BookType.SinglePage) {
		this.path = path;
		this.pages = pages;
		this.type = type;
	}


	public toDto(): PhotoBookInterface {
		return {
			pages: this.pages.map((page) => page.toDto()),
			title: this.name
		};
	}
}
