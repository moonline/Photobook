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


	/* controllers */
	app.controller('ImageController', ImageController);
	ImageController.$inject = ['$scope', '$location'];
	
	return app;
});
