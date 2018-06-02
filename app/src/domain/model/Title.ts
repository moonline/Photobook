import { Title as TitleInterface } from '../dto/Title';


export class Title implements TitleInterface {
	public static createFromDto(dto: TitleInterface): Title {
		const title = new Title(dto.value);
		title.properties = dto.properties;
		return title;
	}

	public readonly value: string;
	public properties: {
		type: string,
		size: string,
		width: number|string,
		top: number,
		left: number
	};

	constructor(title: string = 'New Title') {
		this.value = title;
		this.properties = {
			left: 9,
			size: 'normal',
			top: 7,
			type: 'standard',
			width: 9
		};
	}
}
