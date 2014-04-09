define([
	"angular",
	"Application/ImageController",

	"angular-route"
	],
	function(
			angular,
			ImageController
		) {
	'use strict';

	
	var app = angular.module('App', [ 'ngRoute' ]);
	app.config(function($routeProvider) {
		$routeProvider.when('/', {
		    templateUrl: require.toUrl('Resources/Views/imageView.html'),
		    controller: ImageController
		});

		/*$routeProvider.when('/contacts', {
			templateUrl: 'Resources/Views/contactView.html',
			controller: 'ContactController'
		});*/

		$routeProvider.otherwise({
			redirectTo:'/'
		});
	});

	app.directive('contenteditable', function() {
		return {
			require: 'ngModel',
			link: function(scope, element, attrs, ctrl) {
				// view -> model
				element.bind('blur', function() {
					scope.$apply(function() {
						ctrl.$setViewValue(element.html());
					});
				});

				// model -> view
				ctrl.$render = function() {
					element.html(ctrl.$viewValue);
				};

				// load init value from DOM
				ctrl.$render();
			}
		};
	});


	/* controllers */
	app.controller('ImageController', ImageController);
	ImageController.$inject = ['$scope', '$location'];
	
	return app;
});
