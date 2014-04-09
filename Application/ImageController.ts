import Page = require("Model/Page");
import Image = require("Model/Image");
import FileService = require("Service/FileService");

declare function saveAs(blobb, name: string):void;

class ImageController{
	$scope: any;

	constructor($scope, $location) {
		this.$scope = $scope;

		this.$scope.title = "Image Manager";
		this.$scope.pages = [];
		this.$scope.linesPerPageAvailable = [1,2,3,4];
		this.$scope.imagePropertiesAvailable = ["horizontal", "vertical", "wide", "double"];

		this.addDummyData();

		$scope.addPage = function () {
			var numberOfLines = Number(prompt("Number of lines")) || 2;
			var page = new Page(numberOfLines);
			$scope.pages.push(page);
		};

		$scope.addFile = function(s:Object) {
			console.log(s);
		};

		$scope.addImage = function(page: Page, imagePath: string = null) {
			var imagePath = imagePath || prompt("Image Path");
			if(imagePath) {
				page.addImage(new Image(imagePath));
			}
		};

		$scope.save = function() {
			var blob = new Blob([JSON.stringify({pages: $scope.pages})], {type: 'application/json'});
			var fileSaver = saveAs(blob,"photobook.json");
		};

		$scope.loadFile = function(files) {
			FileService.readFile(files[0], function(fileContent) {
				var data = JSON.parse(fileContent);
				console.log(data);
				$scope.pages = data['pages'];
				$scope.$apply();
			});
		};
	}

	private addDummyData() {
		var page = new Page(2);
		//var image = new Image('file:///home/tobias/Live/Fotos/1204 Israel/P4100235.JPG');
		//image.setCaption("Rotes Meer");
		//page.addImage(image);
		this.$scope.pages.push(page);

	}
}

export = ImageController;
