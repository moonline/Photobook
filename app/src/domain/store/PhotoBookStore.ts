import { computed, observable } from 'mobx';
import * as Path from 'path';

import { Page as PageInterface } from '../dto/Page';
import { PhotoBook as PhotoBookInterface } from '../dto/PhotoBook';

import { PhotoBook as PhotoBookModel } from '../model/PhotoBook';

import { THUMBNAIL_DIRECTORY } from '../../config/app';
import { RootStore } from './RootStore';


export class PhotoBookStore {
	private rootStore: RootStore;

	@observable
	public photoBook: PhotoBookModel = null;

	@computed
	get loaded(): boolean {
		return Boolean(this.photoBook);
	}

	constructor(rootStore: RootStore) {
		this.rootStore = rootStore;
	}

	public import = (photoBook: PhotoBookModel): void => {
		this.rootStore.logger('import photobook', (new Date()).toLocaleString());
		this.createPhotoBook(photoBook);
	}

	public export(): PhotoBookInterface {
		return this.photoBook.toDto();
	}

	public createPhotoBook(photoBook: PhotoBookModel): void {
		this.photoBook = photoBook;
		this.photoBook.pages = this.rootStore.pageStore.createPages(photoBook.pages);
	}
}
