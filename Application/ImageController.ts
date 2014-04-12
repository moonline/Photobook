import Page = require("Model/Page");
import Image = require("Model/Image");
import PhotoBook = require("Model/PhotoBook");
import FileService = require("Service/FileService");

declare function saveAs(blobb, name: string):void;

class ImageController{
	$scope: any;

	constructor($scope, $location) {
		this.$scope = $scope;

		this.$scope.title = "Image Manager";
		this.$scope.photoBook = new PhotoBook();
		this.$scope.pages = [];

		this.$scope.settings = {
			displayAvailable: ["horizontal", "vertical", "wide", "double"],
				/*[
				{ item: "horizontal", label: "&#xe053; horizontal" },
				{ item: "vertical", label: "&#xe053; vertical" },
				{ item: "wide", label: "&#xe053; wide" },
				{ item: "double", label: "&#xe053; double" }
			],*/
			linesPerPageAvailable: [1,2,3,4],
			positionAvailable: ["topLeft", "topCenter", "topRight", "middleLeft", "middleCenter", "middleRight", "bottomLeft", "bottomCenter", "bottomRight"],
			titleSizesAvailable: ["small","normal", "large", "extraLarge", "big", "extraBig"],
			titleTypesAvailable: ["standard", "ocean", "desert", "winter", "dark"]
		};

		$scope.getNumberList = function(start:number = 0, end:number = 10, step:number = 1) {
			var numbers:number[] = [];
			for(var i:number = start; i<=end ;i+=step) {
				numbers.push(i);
			}
			return numbers;
		};

		this.addDummyData();

		$scope.save = function() {
			while(!$scope.photoBook.title || $scope.photoBook.title == "") {
				$scope.photoBook.title = prompt("Please enter the title of your photobook");
			}
			var blob = new Blob([JSON.stringify($scope.photoBook)], {type: 'application/json'});
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
	}

	private addDummyData() {
		//var page = new Page(2);
		//var image = new Image('file:///home/tobias/Live/Fotos/1204 Israel/P4100235.JPG');
		//image.setCaption("Rotes Meer");
		//page.addImage(image);
		//this.$scope.pages.push(page);

	}
}

export = ImageController;
