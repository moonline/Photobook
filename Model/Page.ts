import Image = require("Model/Image");
import Title = require("Model/Title");

class Page {
	numberOfLines: number;
	images: Image[];
	titles: Title[];

	constructor(numberOfLines: number = 2) {
		this.numberOfLines = numberOfLines;
		this.images = [];
		this.titles = [];
	}

	public importFromObject(page: any) {
		this.numberOfLines = page.numberOfLines;
		for(var i in page.images) {
			var newImage:Image = new Image(page.images[i].path);
			newImage.importFromObject(page.images[i]);
			this.images.push(newImage);
		}
		for(var j in page.titles) {
			var newTitle:Title = new Title();
			newTitle.importFromObject(page.titles[j]);
			this.titles.push(newTitle);
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

	public createTitle(title:string = ""):void {
		this.titles.push(new Title(title));
	}

	public removeTitle(title: Title) {
		var position:number = this.titles.indexOf(title);
		if(position >= 0) {
			this.titles.splice(position,1);
		}
	}
}

export = Page;