class Image {
	path: string;
	properties: Object;
	caption: string;

	constructor(path) {
		this.path = path;
		this.properties = {
			display: "horizontal",
			position: "middleCenter"
		};
		this.caption = null;
	}

	public importFromObject(image: any):void {
		this.path = image.path;
		this.properties = image.properties;
		this.caption = image.caption;
	}

	public setCaption(caption: string) {
		this.caption = caption;
	}
}

export = Image;