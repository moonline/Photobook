define(["require", "exports", "Model/Page", "Model/Image"], function(require, exports, Page, Image) {
    var ImageController = (function () {
        function ImageController($scope, $location) {
            this.$scope = $scope;

            this.$scope.title = "Image Manager";
            this.$scope.pages = [];
            this.addDummyData();

            $scope.addPage = function () {
                var page = new Page(2);
                page.addImage(new Image('file:///home/tobias/Live/Fotos/1204 Israel/P4100235.JPG'));
                page.addImage(new Image('file:///home/tobias/Live/Fotos/1204 Israel/P4100235.JPG'));
                $scope.pages.push(page);
            };
        }
        ImageController.prototype.addDummyData = function () {
            var page = new Page(1);
            var image = new Image('file:///home/tobias/Live/Fotos/1204 Israel/P4100235.JPG');
            image.setCaption("Rotes Meer");
            page.addImage(image);
            this.$scope.pages.push(page);
        };
        return ImageController;
    })();

    
    return ImageController;
});
