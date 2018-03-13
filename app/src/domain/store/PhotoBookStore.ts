import * as Path from 'path';
import { observable, computed } from 'mobx';

import { PhotoBook as PhotoBookInterface } from '../dto/PhotoBook';
import { Page as PageInterface } from '../dto/Page';

import { THUMBNAIL_DIRECTORY } from '../../config/app';


export class PhotoBookStore {
	@observable
	private pages: PageInterface[] = [];

	@observable
	public title: string;

	@observable
	public directory: string;

	@computed
	get thumbnailDirectory(): string {
		return this.directory ? Path.join(this.directory, THUMBNAIL_DIRECTORY) : null;
	}

	@computed
	get all(): PageInterface[] {
		return this.pages;
	}

	@computed
	get photoBook(): PhotoBookInterface {
		return {
			title: this.title,
			pages: this.pages
		};
	}

	@computed
	get loaded(): boolean {
		return this.pages.length > 0 && Boolean(this.title) && Boolean(this.directory);
	}


	public import = (photoBook: PhotoBookInterface, directory: string): void => {
		this.title = photoBook.title;
		this.pages = photoBook.pages;
		this.directory = directory;
	}


	public findById = (id: number) => this.pages[id] ? this.pages[id] : null;

	public findPrevious = (page: PageInterface) => {
		let position: number = this.pages.indexOf(page);
		if (position > 0) {
			return this.pages[position-1]
		} else if (position === 0) {
			return this.pages.slice(-1)[0];
		} else {
			null;
		}
	}

	public findNext = (page: PageInterface) => {
		let position: number = this.pages.indexOf(page);
		if (position = this.pages.length-1) {
			return this.pages[0];
		} else if (position >= 0) {
			return this.pages[position+1]
		} else {
			null;
		}
	}

	/*
	public add = (page: Page, position: number = this.pages.length): void => {
		this.pages.splice(position, 0, page);
	}

	public addBefore = (page: Page, beforePage: Page) => {
		let position: number = this.pages.indexOf(beforePage);
		if (position >= 0) {
			this.add(page, position);
		}
	}

	public addAfter = (page: Page, afterPage: Page) => {
		let position: number = this.pages.indexOf(afterPage);
		if (position >= 0) {
			this.add(page, position + 1);
		}
	}
	*/
}
