/// <reference path="../Domain/Model/Page.ts"/>
/// <reference path="../Domain/Model/Image.ts"/>
/// <reference path="../Domain/Model/PhotoBook.ts"/>
/// <reference path="../Domain/Model/Element.ts"/>

/// <reference path="../Service/FileService.ts"/>

/// <reference path="../../Resources/Libraries/FileSaver/FileSaver.d.ts"/>

/// <reference path="../../Configuration/LayoutConfiguration.ts"/>

module app.application {
	'use strict';

	export class ImageController {
		scope: any;

		constructor($scope, $location) {
			this.scope = $scope;
			this.scope.currentElement = null;

			this.scope.min = this.min.bind(this);
			this.scope.isGroupStartPage = this.isGroupStartPage.bind(this);
			this.scope.setVisiblePages = this.setVisiblePages.bind(this);
			this.scope.getNumberList = this.getNumberList.bind(this);
			this.scope.save = this.save.bind(this);
			this.scope.loadFile = this.loadFile.bind(this);

			this.scope.title = "Image Manager";
			this.scope.photoBook = new app.domain.model.PhotoBook();
			this.scope.pages = [];
			this.scope.availableLayouts = Object.keys(configuration.LayoutConfiguration.layouts);
			this.scope.layouts = configuration.LayoutConfiguration.layouts;
			this.scope.pagesPerGroup = 4;
			this.scope.visiblePagesStart = 0;

			// prevent user from closing the browser accidentially
			window.onbeforeunload = function() { return true; };
		}


		min(num1: number, num2: number): number {
			return Math.min(num1, num2);
		}

		isGroupStartPage(page: number): boolean {
			return page % this.scope.pagesPerGroup == 0;
		}

		setVisiblePages(startPage: number): void {
			this.scope.visiblePagesStart = startPage;
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

			while(!this.scope.photoBook.title || this.scope.photoBook.title == "") {
				this.scope.photoBook.title = prompt("Please enter the title of your photobook");
			}
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
				scope.$apply();
			});
		}
	}
}
