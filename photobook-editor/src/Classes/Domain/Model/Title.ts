/// <reference path="./Element.ts"/>

module app.domain.model {
	'use strict';

	export class Title implements app.domain.model.Element {
		value: string;
		properties: Object;

		constructor(title:string = "New Title") {
			this.value = title;
			this.properties = {
				type: "standard",
				size: "normal",
				width: 9,
				top: 7,
				left: 9
			}
		}

		public importFromObject(title: any) {
			this.value = title.value;
			this.properties = title.properties;
		}
	}
}