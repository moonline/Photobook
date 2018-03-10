import { PhotoBook as PhotoBookInterface } from '../dto/PhotoBook';

import { Page } from './Page';


export class PhotoBook implements PhotoBookInterface {
	public title: string;
	public pages: Page[];

	constructor(title: string) {
		this.title = title;
	}

	static createFromDto(dto: PhotoBookInterface): PhotoBook {
		let book = new PhotoBook(dto.title);
		book.pages = dto.pages.map(Page.createFromDto);
		return book;
	}
}
