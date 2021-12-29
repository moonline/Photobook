/// <reference path="../Domain/Model/Page.ts"/>
/// <reference path="../Domain/Model/Image.ts"/>
/// <reference path="../Domain/Model/Title.ts"/>
/// <reference path="../Domain/Model/PhotoBook.ts"/>
/// <reference path="../Domain/Model/Element.ts"/>

/// <reference path="../Service/FileService.ts"/>

/// <reference path="../../Resources/Libraries/FileSaver/FileSaver.d.ts"/>

/// <reference path="../Domain/LayoutConfiguration.ts"/>

module app.application {
	'use strict';

	export class ImageController {
		scope: any;

		constructor($scope, $location) {
			this.scope = $scope;
			this.scope.currentElement = null;
			this.scope.currentPage = null;

			this.scope.getTypeName = this.getTypeName.bind(this);
			this.scope.setCurrentElement = this.setCurrentElement.bind(this);
			this.scope.min = this.min.bind(this);
			this.scope.isGroupStartPage = this.isGroupStartPage.bind(this);
			this.scope.getGroupEndPage = this.getGroupEndPage.bind(this);
			this.scope.setVisiblePagesStart = this.setVisiblePagesStart.bind(this);
			this.scope.isPageInGroup = this.isPageInGroup.bind(this);
			this.scope.getNumberList = this.getNumberList.bind(this);
			this.scope.save = this.save.bind(this);
			this.scope.loadFile = this.loadFile.bind(this);

			this.scope.title = "Image Manager";
			this.scope.photoBook = new app.domain.model.PhotoBook();
			this.scope.pages = [];
			this.scope.availableLayouts = Object.keys(configuration.LayoutConfiguration.layouts);
			this.scope.layouts = configuration.LayoutConfiguration.layouts;
			this.scope.pagesPerGroup = 16;
			this.scope.numberOfTitlePages = 0;
			this.scope.visiblePagesStart = 0;
			this.scope.imageQuality = 500;

			window['currentElement'] = this.scope.currentElement;

			// prevent user from closing the browser accidentially
			window.onbeforeunload = function() { return true; };
		}

		// TODO: improove
		getTypeName(element: any): string {
			if(element instanceof app.domain.model.Page) { return 'Page'; }
			if(element instanceof app.domain.model.Image) { return 'Image'; }
			if(element instanceof app.domain.model.Title) { return 'Title'; }
			if(element instanceof app.domain.model.PhotoBook) { return 'PhotoBook'; }
			return null;
		}

		setCurrentElement(element: app.domain.model.Element, page: app.domain.model.Page): void {
			this.scope.currentElement = element;
			this.scope.currentPage = page;
		}

		min(num1: number, num2: number): number {
			return Math.min(num1, num2);
		}

		isGroupStartPage(page: number): boolean {
			return page == 0 || (page - this.scope.numberOfTitlePages) % this.scope.pagesPerGroup == 0;
		}

		getGroupEndPage(groupStartPage: number): number {
			if(groupStartPage > this.scope.numberOfTitlePages-1) {
				return groupStartPage + this.scope.pagesPerGroup-1;
			} else {
				return this.scope.numberOfTitlePages-1;
			}
		}

		setVisiblePagesStart(startPage: number): void {
			this.scope.visiblePagesStart = startPage;
		}

		isPageInGroup(page) {
			return page >= this.scope.visiblePagesStart && page <= this.getGroupEndPage(this.scope.visiblePagesStart);
		}

		getNumberList(start:number = 0, end:number = 10, step:number = 1): number[] {
			var numbers:number[] = [];
			for(var i:number = start; i<=end ;i+=step) {
				numbers.push(i);
			}
			return numbers;
		}

		save(): void {
			var scope = this.scope;

			if (!this.scope.photoBook.title || this.scope.photoBook.title == "") {
				alert('Please choose a title for your photobook');
			} else {
				var serializedObjects: any[] = [];
				var blob = new Blob([JSON.stringify(
					scope.photoBook,
					function(key: any, value: any) {
						// don't serialize parent relations of pages -> cyclic
						if (key=="parentPhotoBook") {
							return undefined;
						}
						else return value;
					}
				)], {type: 'application/json'});
				var fileSaver = saveAs(blob,this.scope.photoBook.title.replace(" ","-")+".json");
			}
		}

		/**
		 * Load content of a file
		 *
		 * @param files list of files from input type file
		 */
		loadFile(files) {
			var scope = this.scope;

			app.service.FileService.readFile(files[0], function(fileContent) {
				var photobook = new app.domain.model.PhotoBook();
				photobook.importFromObject(JSON.parse(fileContent));
				scope.photoBook = photobook;
				this.setCurrentElement(photobook.pages[0], photobook.pages[0]);
				scope.$apply();
			}.bind(this));
		}
	}
}
