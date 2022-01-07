/// <reference path='./Resources/Libraries/AngularJS/angular.d.ts' />
/// <reference path='./Resources/Libraries/global.d.ts' />
/// <reference path='./Classes/Module/MainModule.ts' />

module app {
	'use strict';

	var mainModule = new app.mod.MainModule(angular,"MainModule");
	angular.bootstrap(document, [mainModule.name]);
}