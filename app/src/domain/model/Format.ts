export type PageMargin = [number, number, number, number];

export type PageSize =  [number, number];


export class Format {
	readonly name: string;
	// page margin in mm: top, right, bottom, left
	readonly margin: PageMargin;
	// page size in mm: width, height
	readonly size: PageSize;

	constructor(name: string, margin: PageMargin = [0,0,0,0], size: PageSize = [210, 297]) {
		this.name = name;
		this.margin = margin;
		this.size = size;
	}
}
