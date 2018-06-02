export interface Image {
	path: string;
	properties: {
		display: string,
		position: string,
		verticalStyle: string,
		offsetLeft?: number,
		// TODO: Create compatibility import handler to fix that
		offsetTop?: number|string
	},
	caption?: string;
	// TODO: Create compatibility import handler to fix that
	$$hashKey?: string;
}
