/// <reference path="../Domain/Model/Page.ts"/>
/// <reference path="../Domain/Model/Image.ts"/>
/// <reference path="../Domain/Model/PhotoBook.ts"/>

/// <reference path="../Service/FileService.ts"/>

/// <reference path="../../Resources/Libraries/FileSaver/FileSaver.d.ts"/>

/// <reference path="../../Configuration/LayoutConfiguration.ts"/>

module app.application {
	'use strict';

	export class ImageController {
		$scope: any;

		constructor($scope, $location) {
			this.$scope = $scope;

			this.$scope.title = "Image Manager";
			this.$scope.photoBook = new app.domain.model.PhotoBook();
			this.$scope.pages = [];
			this.$scope.availableLayouts = Object.keys(configuration.LayoutConfiguration.layouts);
			this.$scope.layouts = configuration.LayoutConfiguration.layouts;
			this.$scope.pagesPerGroup = 4;
			this.$scope.visiblePagesStart = 0;

			$scope.min = function(num1: number, num2: number) {
				return Math.min(num1, num2);
			};

			$scope.isGroupStartPage = function(page: number) {
				return page % $scope.pagesPerGroup == 0;
			};

			$scope.setVisiblePages = function(startPage: number) {
				$scope.visiblePagesStart = startPage;
			};

			$scope.getNumberList = function(start:number = 0, end:number = 10, step:number = 1) {
				var numbers:number[] = [];
				for(var i:number = start; i<=end ;i+=step) {
					numbers.push(i);
				}
				return numbers;
			};

			$scope.save = function() {
				while(!$scope.photoBook.title || $scope.photoBook.title == "") {
					$scope.photoBook.title = prompt("Please enter the title of your photobook");
				}
				var serializedObjects: any[] = [];
				var blob = new Blob([JSON.stringify(
					$scope.photoBook,
					function(key: any, value: any) {
						// don't serialize parent relations of pages -> cyclic
						if (key=="parentPhotoBook") {
							return undefined;
						}
						else return value;
					}
				)], {type: 'application/json'});
				var fileSaver = saveAs(blob,$scope.photoBook.title.replace(" ","-")+".json");
			};

			$scope.loadFile = function(files) {
				app.service.FileService.readFile(files[0], function(fileContent) {
					var photobook = new app.domain.model.PhotoBook();
					photobook.importFromObject(JSON.parse(fileContent));
					$scope.photoBook = photobook;
					$scope.$apply();
				});
			};

			// prevent user from closing the browser accidentially
			window.onbeforeunload = function() { return true; };

			console.log($scope);
		}
	}
}
