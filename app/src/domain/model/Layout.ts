export interface Layout {
	name: string;
}

export class RowLayout implements Layout {
	readonly sections: number;

	constructor(sections: number = 1) {
		this.sections = sections;
	}

	get name(): string {
		return this.constructor.name.toLowerCase();
	}
}
