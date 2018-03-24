import * as Path from 'path';

import { PhotoBook as PhotoBookInterface } from '../dto/PhotoBook';

import { Page } from './Page';

import { THUMBNAIL_DIRECTORY } from '../../config/app';


export enum BookType {
	SinglePage
}


export class PhotoBook {
	readonly path: string;
	public pages: Page[];
	readonly type: BookType;

	get directory() {
		return Path.dirname(this.path);
	}

	get thumbnailDirectory(): string {
		return Path.join(this.directory, THUMBNAIL_DIRECTORY);
	}


	constructor(path: string, pages: Page[] = [], type: BookType = BookType.SinglePage) {
		this.path = path;
		this.pages = pages;
		this.type = type;
	}


	static createFromDto(dto: PhotoBookInterface, path: string): PhotoBook {
		return new PhotoBook(path, dto.pages.map(Page.createFromDto));
	}
}
