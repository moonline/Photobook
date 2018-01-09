export interface Image {
	path: string,
	properties: {
		display: string,
		position: string,
		verticalStyle: string,
		offsetLeft?: number,
		offsetTop?: number
	},
	caption?: string
}
