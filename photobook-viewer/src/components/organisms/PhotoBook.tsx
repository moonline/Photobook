import * as React from 'react';

import { PhotoBook as PhotoBookInterface } from '../../domain/dto/PhotoBook';
import { Page as PageModel } from '../../domain/model/Page';


export interface PhotoBookProps {
	path: string;
	pages: PageModel[];
	children: (page: PageModel, key: number|string) => React.ReactNode;
}

export const PhotoBook: React.SFC<PhotoBookProps> = ({ path, pages, children: renderPage }) => (
	<div className="photobook">
		{pages.map(renderPage)}
	</div>
);
