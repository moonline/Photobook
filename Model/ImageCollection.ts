import Page = require("Model/Page");

class ImageCollection {
	pages: Page[];
	name: string;

	constructor(name: string) {
		this.name = name;
		this.pages = [];
	}

	addPage(page: Page) {
		this.pages.push(page);
	}

	public setName(name: string) {
		this.name = name;
	}

	public getName(): string {
		return this.name;
	}
}

export = ImageCollection;