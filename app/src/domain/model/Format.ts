export type PageMargin = [number, number, number, number];

export type PageSize =  [number, number];


export class Format {
	public readonly name: string;
	// page margin in mm: top, right, bottom, left
	public readonly margin: PageMargin;
	// page size in mm: width, height
	public readonly size: PageSize;

	get width(): number {
		return this.size[0];
	}

	get height(): number {
		return this.size[1];
	}

	constructor(name: string, margin: PageMargin = [0,0,0,0], size: PageSize = [210, 297]) {
		this.name = name;
		this.margin = margin;
		this.size = size;
	}
}
