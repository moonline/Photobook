import { Image as ImageInterface } from '../dto/Image';


export class Image implements ImageInterface {
	readonly path: string;
	public properties: {
		display: string,
		position: string,
		verticalStyle: string
	};
	readonly caption: string;

	constructor(path: string, caption: string) {
		this.caption = caption;
		this.path = path;
	}

	static createFromDto(dto: ImageInterface): Image {
		let book = new Image(dto.path, dto.caption);
		book.properties = dto.properties;
		return book;
	}
}
