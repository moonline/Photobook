import Image = require("Model/Image");
import Title = require("Model/Title");
import PhotoBook = require("Model/PhotoBook");
import RelativePosition = require("Model/RelativePosition");

class Page {
	properties: Object;
	images: Image[];
	titles: Title[];
	parentPhotoBook: PhotoBook;

	constructor(sections: number = 2) {
		this.images = [];
		this.titles = [];
		this.parentPhotoBook = null;

		this.properties = {
			layout: "standard",
			sections: sections
		};
	}

	public setPhotobook(photoBook: PhotoBook):void {
		this.parentPhotoBook = photoBook;
	}

	public importFromObject(page: any):void {
		// for backward compatibility: import numberOfLines property from attribute
		this.properties = page.properties || { layout: "standard", sections: page.numberOfLines };
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

	public insertImage(image: Image):void {
		this.images.unshift(image);
	}

	public addImagePaths(pathList: string): void {
		var paths: string[] = new Array();
		var imagePaths:string[] = pathList.split("\n");
		for(var i in imagePaths) {
			if(paths.indexOf(imagePaths[i]) < 0 && imagePaths[i].length > 1) {
				paths.push(imagePaths[i]);
				this.createImage(imagePaths[i]);
			}
		}
	}

	public createImage(path: string = prompt('Image path')):void {
		if(path && path.length > 1) {
			this.images.push(new Image(path));
		}
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
		if(from >= 0) {
			if(to < 0) {
				this.parentPhotoBook.getNeighborPage(this,RelativePosition.previous).addImage(image);
				this.images.splice(from,1);
			} else if(to >= this.images.length) {
				this.parentPhotoBook.getNeighborPage(this,RelativePosition.next).insertImage(image);
				this.images.splice(from,1);
			} else {
				this.images.splice(to, 0, this.images.splice(from, 1)[0]);
			}
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