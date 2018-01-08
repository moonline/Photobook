import { Serializable } from './Serializable';
import { PageTitle } from './PageTitle';


export class BookPage {
	public images: any[] = [];
	public titles: PageTitle[] = [];
	public previousPage: BookPage = null;
	public nextPage: BookPage = null;
	public properties: {
		layout: string,
		sections: number
	};

	constructor(sections: number = 2) {
		this.properties = { layout: "standard", sections: sections };
	}

	static createFromDto(bookPageDto: { [name: string]: any }): BookPage {
		let page = new BookPage();
		page.properties = page.properties;
		page.titles = bookPageDto.titles.map(PageTitle.createFromDto);
		// TODO: deserialize images
		return page;
	}

	/*
	addImage(image: Image):void {
		this.images.push(image);
	}

	insertImage(image: Image):void {
		this.images.unshift(image);
	}

	removeImage(image: Image):void {
		let position: number = this.images.indexOf(image: Image);
		if(position >= 0) {
			this.images.splice(position,1);
		}
	}

	moveImage(image: Image, amount: number = 1):void {
		let from: number = this.images.indexOf(image);
		let to: number = from+amount;
		if(from >= 0) {
			if(to < 0) {
				this.previousPage.addImage(image);
				this.images.splice(from,1);
			} else if(to >= this.images.length) {
				this.nextPage.insertImage(image);
				this.images.splice(from,1);
			} else {
				this.images.splice(to, 0, this.images.splice(from, 1)[0]);
			}
		}
	}
	*/

	createTitle(title: string = ""): void {
		this.titles.push(new PageTitle(title));
	}

	removeTitle(title: PageTitle): boolean {
		let position: number = this.titles.indexOf(title);
		if(position >= 0) {
			this.titles.splice(position,1);
			return true;
		} else {
			return false;
		}
	}
}
