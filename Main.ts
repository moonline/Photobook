/// <reference path="Application/ImageModule.ts"/>
import ngRoute = require("Lib/AngularJS/angularRoute");

class RequireJS {
	require:any = window['require'];

	constructor(config:any) {
		this.require['config'](config);
	}

	public load(classes: string[], callback:any):void {
		this.require(classes, callback);
	}
}

var requireJS = new RequireJS({
	baseUrl: ".",
	paths: {
		"angular": "Lib/AngularJS/angular",
		"angular-route": "Lib/AngularJS/angularRoute"
	},
	shim: {
		angular: {
			exports: "angular"
		},
		"angular-route": ["angular"]
	}
});

requireJS.load(["angular", "Application/ImageModule", "angular-route"], function(angular, ImageModule) {
	var module = new ImageModule(window['require'], angular);
	angular.bootstrap(document, [module.getApp().name]);
});
