class Image {
	path: string;
	properties: string[];
	caption: string;

	constructor(path) {
		this.path = path;
		this.properties = [];
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