class Image {
	path: string;
	properties: Object;
	caption: string;

	constructor(path) {
		this.path = path;
		this.properties = { display: "horizontal" };
		this.caption = null;
	}

	public setCaption(caption: string) {
		this.caption = caption;
	}
		
	public setProperty(property: string) {
		if(!(this.properties.indexOf(property) >= 0)) {
			this.properties.push(property);
		}
	}
}

export = Image;