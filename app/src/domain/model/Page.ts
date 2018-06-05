import { Page as PageInterface } from '../dto/Page';

import { Format, PageMargin } from './Format';
import { Image } from './Image';
import { Layout, RowLayout } from './Layout';
import { Title } from './Title';

export enum Orientation {
	Portrait,
	Landscape
}


export class Page {
	public static createFromDto(dto: PageInterface): Page {
		const layout: Layout = dto.properties.layout === 'standard'
			? new RowLayout(dto.properties.sections)
			: new RowLayout();
		const page = new Page(layout);
		page.titles = dto.titles.map(Title.createFromDto);
		page.images = dto.images.map(Image.createFromDto);
		return page;
	}

	public readonly layout: Layout;
	public readonly orientation: Orientation = Orientation.Landscape;
	public readonly format: Format = new Format('A4', [10, 10, 10, 10], [210, 297]);
	public images: Image[] = [];
	public titles: Title[] = [];
	public previousPage: Page = null;
	public nextPage: Page = null;

	get height(): number {
		return this.orientation === Orientation.Portrait
			? this.format.height
			: this.format.width;
	}

	get width(): number {
		return this.orientation === Orientation.Portrait
			? this.format.width
			: this.format.height;
	}

	get margin(): PageMargin {
		return this.format.margin;
	}

	constructor(
		layout: Layout = new RowLayout(1),
		orientation: Orientation = Orientation.Landscape,
		format: Format = new Format('A4', [10, 10, 10, 10], [210, 297])
	) {
		this.format = format;
		this.orientation = orientation;
		this.layout = layout;
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

	createTitle(title: string = ""): void {
		this.titles.push(new Title(title));
	}

	removeTitle(title: Title): boolean {
		let position: number = this.titles.indexOf(title);
		if(position >= 0) {
			this.titles.splice(position,1);
			return true;
		} else {
			return false;
		}
	}
	*/
}
