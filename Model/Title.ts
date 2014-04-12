class Title {
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

export = Title;