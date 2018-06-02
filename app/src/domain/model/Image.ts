import { Image as ImageInterface } from '../dto/Image';


export class Image implements ImageInterface {
	public static createFromDto(dto: ImageInterface): Image {
		const book = new Image(dto.path, dto.caption);
		book.properties = dto.properties;
		return book;
	}

	public readonly path: string;
	public readonly caption: string;
	public properties: {
		display: string,
		position: string,
		verticalStyle: string
	};

	constructor(path: string, caption: string) {
		this.caption = caption;
		this.path = path;
	}
}
