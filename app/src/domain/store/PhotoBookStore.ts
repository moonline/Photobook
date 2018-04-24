import * as Path from 'path';
import { observable, computed } from 'mobx';

import { PhotoBook as PhotoBookInterface } from '../dto/PhotoBook';
import { Page as PageInterface } from '../dto/Page';

import { PhotoBook as PhotoBookModel } from '../model/PhotoBook';

import { THUMBNAIL_DIRECTORY } from '../../config/app';


export class PhotoBookStore {
	@observable
	public photoBook: PhotoBookModel = null;

	@computed
	get loaded(): boolean {
		return Boolean(this.photoBook);
	}


	public import = (photoBook: PhotoBookModel): void => {
		// TODO: use logging service
		console.log('import photobook', (new Date()).toLocaleString());
		this.photoBook = photoBook;
	}

	/* TODO: move to page store or page model
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
