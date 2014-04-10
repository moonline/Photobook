import Image = require("Model/Image");

class Page {
	numberOfLines: number;
	images: Image[];

	constructor(numberOfLines: number = 2) {
		this.numberOfLines = numberOfLines;
		this.images = [];
	}

	public importFromObject(page: any) {
		this.numberOfLines = page.numberOfLines;
		for(var i in page.images) {
			var newImage:Image = new Image(page.images[i].path);
			newImage.importFromObject(page.images[i]);
			this.images.push(newImage);
		}
	}

	public addImage(image: Image):void {
		this.images.push(image);
	}

	public createImage(path: string = prompt('Image path')):void {
		this.images.push(new Image(path));
	}

	public removeImage(image: Image):void {
		var position:number = this.images.indexOf(image);
		if(position >= 0) {
			this.images.splice(position,1);
		}
	}

	public moveImage(image: Image, amount:number = 1) {
		var from:number = this.images.indexOf(image);
		var to:number = from+amount;
		if(from >= 0 && to >= 0 && to < this.images.length) {
			this.images.splice(to, 0, this.images.splice(from, 1)[0]);
		}

	}
}

export = Page;