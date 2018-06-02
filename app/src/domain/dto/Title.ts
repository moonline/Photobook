export interface Title {
	value: string;
	properties: {
		type: string,
		size: string,
		top: number,
		left: number,
		// TODO: Create compatibility import handler to fix that
		width: number|string
	};
	// TODO: Create compatibility import handler to fix that
	$$hashKey?: string;
}
