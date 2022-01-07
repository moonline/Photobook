module app.service.PPIService {
	'use strict';

	export var ppi: number;

	export function calcPPI(): number {
		if (!(PPIService.ppi > 0)) {
			var element = document.createElement('div');
			element.setAttribute('style', 'display: block; width: 1cm!important; padding: 0; margin: 0;');
			document.getElementsByTagName('body')[0].appendChild(element);
			PPIService.ppi = element['offsetWidth'];
		}
		return PPIService.ppi;
	}
}