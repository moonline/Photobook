import { Image } from './Image';
import { Title } from './Title';


export interface Page {
	images: Image[],
	titles: Title[],
	properties: {
		layout: string,
		sections: number
	}
}
