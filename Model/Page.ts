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

	public addImageFromPath(path: string):void {
		this.images.push(new Image(path));
	}

	public removeImage(image: Image):void {
		var position:number = this.images.indexOf(image);
		if(position >= 0) {
			this.images.splice(position,1);
		}
	}
}

export = Page;