/// <reference path="./Element.ts"/>

module app.domain.model {
	'use strict';

	export class Image implements app.domain.model.Element {
		path: string;
		properties: Object;
		caption: string;

		constructor(path) {
			this.path = path;
			this.properties = {
				display: "horizontal",
				position: "center",
				verticalStyle: "standard"
			};
			this.caption = null;
		}

		public importFromObject(image: any):void {
			this.path = image.path;
			this.properties = image.properties;
			// set if not set -> backward compatibility
			if(!this.properties['display']) { this.properties['display'] = "horizontal"; }
			if(!this.properties['position']) { this.properties['position'] = "center"; }
			if(!this.properties['verticalStyle']) { this.properties['verticalStyle'] = "standard"; }
			this.caption = image.caption;
		}

		public setCaption(caption: string) {
			this.caption = caption;
		}
	}
}