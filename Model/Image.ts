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

	public setCaption(caption: string) {
		this.caption = caption;
	}
}

export = Image;