/// <reference path="./Page.ts"/>
/// <reference path="./RelativePosition.ts"/>

module app.domain.model {
	'use strict';

	export class PhotoBook {
		pages: Page[];
		title: string;

		constructor(title: string = null) {
			this.title = title;
			this.pages = [];
		}

		public addPage(page: Page, position: number = 0): void {
			page.setPhotobook(this);
			this.pages.splice(position, 0, page);
		}

		public getNeighborPage(page: Page, relativePosition: RelativePosition = RelativePosition.next): Page {
			var currentPosition: number = this.pages.indexOf(page);
			var neighborPosition: number = currentPosition + relativePosition;
			if (currentPosition >= 0 && (typeof this.pages[neighborPosition] !== 'undefined')) {
				return this.pages[neighborPosition];
			} else {
				return null;
			}
		}

		public createPageAfter(page: Page, numberOfLines: number = 2): void {
			var pos: number = this.pages.indexOf(page);
			if (pos >= 0) {
				this.createPage(numberOfLines, pos + 1);
			}
		}

		public createPage(numberOfLines: number = 2, position: number = 0): void {
			var page = new Page(numberOfLines);
			page.setPhotobook(this);
			this.addPage(page, position);
		}

		public removePage(page: Page): void {
			var position: number = this.pages.indexOf(page);
			if (position >= 0) {
				this.pages.splice(position, 1);
			}
		}

		public movePage(page: Page, amount: number = 1) {
			var from: number = this.pages.indexOf(page);
			var to: number = from + amount;
			if (from >= 0 && to >= 0 && to < this.pages.length) {
				this.pages.splice(to, 0, this.pages.splice(from, 1)[0]);
			}
		}

		public importFromObject(photobook: any): void {
			this.title = photobook.title;
			for (var i in photobook.pages) {
				var newPage: Page = new Page(photobook.pages[i].numberOfLines);
				newPage.importFromObject(photobook.pages[i]);
				newPage.setPhotobook(this);
				this.pages.push(newPage);
			}
		}
	}
}