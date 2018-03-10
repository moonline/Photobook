import { Serializable } from './Serializable';


export class PageTitle {
	public value: string;
	public properties: {
		type: string,
		size: string,
		width: number,
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

	static createFromDto(titleDto: { [name: string]: any }): PageTitle {
		let title = new PageTitle(titleDto.value);
		title.properties = titleDto.properties;
		return title;
	}
}
