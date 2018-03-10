import * as React from 'react';
import { Page } from './Page';

import { PhotoBook as PhotoBookModel } from '../../domain/model/PhotoBook';
import { Page as PageModel } from '../../domain/model/Page';


interface PhotoBookProps extends PhotoBookModel {
	children: (pageProps: PageModel, key: number|string) => React.ReactNode
}

export const PhotoBook: React.SFC<PhotoBookProps> = ({ title, pages, children: renderPage }) => (
	<div className="photobook">
		{pages.map(renderPage)}
	</div>
);
