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
			linesPerPageAvailable: [1,2,3,4],
			positionAvailable: ["topLeft", "topCenter", "topRight", "middleLeft", "middleCenter", "middleRight", "bottomLeft", "bottomCenter", "bottomRight"]
		};

		this.addDummyData();

		$scope.save = function() {
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
