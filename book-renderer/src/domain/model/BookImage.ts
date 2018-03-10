import { Serializable } from './Serializable';
import * as Path from 'path';

const base = '/home/tobias/Downloads/';


export class BookImage {
	readonly path: string;
	public properties: {
		display: string,
		position: string,
		verticalStyle: string
	};
	readonly caption: string;

	constructor(path: string, caption: string) {
		this.caption = caption;
		this.path = Path.join(base, path);
	}

	static createFromDto(dto: { [name: string]: any }): BookImage {
		let book = new BookImage(dto.path, dto.caption);
		book.properties = dto.properties;
		return book;
	}
}
