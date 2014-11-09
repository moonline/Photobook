import Page = require("Model/Page");
import Image = require("Model/Image");
import PhotoBook = require("Model/PhotoBook");
import FileService = require("Service/FileService");
import LayoutConfiguration = require("Configuration/LayoutConfiguration");
// included only to get it builded by tsc
import PPIService = require("Service/PPIService");

declare function saveAs(blobb, name: string):void;

class ImageController{
	$scope: any;

	constructor($scope, $location) {
		this.$scope = $scope;

		this.$scope.title = "Image Manager";
		this.$scope.photoBook = new PhotoBook();
		this.$scope.pages = [];
		this.$scope.availableLayouts = Object.keys(LayoutConfiguration.layouts);
		this.$scope.layouts = LayoutConfiguration.layouts;
		this.$scope.pagesPerGroup = 4;
		this.$scope.visiblePagesStart = 0;
		
		$scope.min = function(num1: number, num2: number) {
			return Math.min(num1, num2);
		}
		
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
			FileService.readFile(files[0], function(fileContent) {
				var photobook = new PhotoBook();
				photobook.importFromObject(JSON.parse(fileContent));
				$scope.photoBook = photobook;
				$scope.$apply();
			});
		};

		// prevent user from closing the browser accidentially
		window.onbeforeunload = function() { return true; };
	}
}

export = ImageController;
