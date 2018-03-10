import { Title as TitleInterface } from '../dto/Title';


export class Title implements TitleInterface {
	readonly value: string;
	public properties: {
		type: string,
		size: string,
		width: number|string,
		top: number,
		left: number
	};

	constructor(title:string = "New Title") {
		this.value = title;
		this.properties = {
			type: "standard",
			size: "normal",
			width: 9,
			top: 7,
			left: 9
		}
	}

	static createFromDto(dto: TitleInterface): Title {
		let title = new Title(dto.value);
		title.properties = dto.properties;
		return title;
	}
}
