import { Serializable } from './Serializable';
import { BookPage } from './BookPage';


export class PhotoBook {
	public title: string;
	public pages: BookPage[];

	constructor(title: string) {
		this.title = title;
	}

	static createFromDto(bookDto: { [name: string]: any }): PhotoBook {
		let book = new PhotoBook(bookDto.title);
		book.pages = bookDto.pages.map(BookPage.createFromDto);
		return book;
	}
}
