module app.domain.model {
	'use strict';

	export interface Element {
		importFromObject(object: any): void;
	}
}