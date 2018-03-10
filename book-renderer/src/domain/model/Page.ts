import { Image } from './Image';
import { Title } from './Title';


export interface Page {
	images: Image[],
	titles: Title[],
	properties: {
		layout: string,
		sections: number
	},
	// TODO: Create compatibility import handler to fix that
	$$hashKey?: string
}
