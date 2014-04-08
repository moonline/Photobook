define(["Model/Page", "Model/Image"],
	function(Page, Image) {
	'use strict';

	var ImageController = function($scope, $location) {
		$scope.pages = [];	

		$scope.addPage = function() {
		/*	var page = new Page();
			page.addImage(new Image('file:///home/tobias/Live/Fotos/1204 Israel/P4100235.JPG'));
			$scope.pages.push(page);*/
		};
	};

	return ImageController;
});
