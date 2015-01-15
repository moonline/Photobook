if(!window.configuration) { window.configuration = {}; }

window.configuration.layoutConfiguration = {
	layouts: {
		standard: {
			sections: [1, 2, 3, 4],
			image: {
				layouts: ["slim","vertical","horizontal", "double", "wide"],
				positions: ["custom","left","top", "right", "bottom","center"],
				verticalStyles: ["standard", "double", "tribble"]
			},
			title: {
				sizes: ["small", "normal", "large", "extraLarge", "big", "extraBig"],
				layouts: ["standard", "ocean", "desert", "winter", "dark"]
			}
		}/*,
		column: {
			imageLayouts: ["horizontal", "vertical", "wide", "double"],
			sections: [1, 2],
			imagePositions: ["left","top", "right", "bottom"],
			titleSizes: ["small", "normal", "large", "extraLarge", "big", "extraBig"],
			titleLayouts: ["standard", "ocean", "desert", "winter", "dark"]
		}*/
	}
};