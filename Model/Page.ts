import Image = require("Model/Image");

class Page {
	numberOfLines: number;
	images: Image[];

	constructor(numberOfLines: number = 2) {
		this.numberOfLines = numberOfLines;
		this.images = [];
	}

	public addImage(image: Image) {
		this.images.push(image);
	}
}

export = Page;