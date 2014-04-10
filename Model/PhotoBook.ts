import Page = require("Model/Page");

class PhotoBook {
	pages: Page[];
	title: string;

	constructor(title: string = null) {
		this.title = title;
		this.pages = [];
	}

	public addPage(page: Page, position: number = 0):void {
		this.pages.splice(position, 0, page);
	}

	public createPage(numberOfLines: number = 2, position: number = 0):void {
		var page = new Page(numberOfLines);
		this.addPage(page,position);
	}

	public removePage(page:Page):void {
		var position:number = this.pages.indexOf(page);
		if(position >= 0) {
			this.pages.splice(position,1);
		}
	}

	public movePage(page: Page, amount:number = 1) {
		var from:number = this.pages.indexOf(page);
		var to:number = from+amount;
		if(from >= 0 && to >= 0 && to < this.pages.length) {
			this.pages.splice(to, 0, this.pages.splice(from, 1)[0]);
		}
	}

	public importFromObject(photobook: any):void {
		this.title = photobook.title;
		for(var i in photobook.pages) {
			var newPage:Page = new Page(photobook.pages[i].numberOfLines);
			newPage.importFromObject(photobook.pages[i]);
			this.pages.push(newPage);
		}
	}
}

export = PhotoBook;