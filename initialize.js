(function() {
	'use strict';

	require.config({
		baseUrl: ".",
		paths: {
			"angular": "Lib/AngularJS/angular",
			"angular-route": "Lib/AngularJS/angular-route"
		},
		shim: {
			angular: {
				exports: "angular"
			},
			"angular-route": ["angular"]
		}
	});

	require(["angular", "Configuration/angularConfig"], function(angular, angularModule) {
		'use strict';

		angular.bootstrap(document, [angularModule.name]);
	});

})();
