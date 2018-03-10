import * as React from 'react';
import { Page } from './Page';

import { PhotoBook as PhotoBookInterface } from '../../domain/dto/PhotoBook';
import { Page as PageInterface } from '../../domain/dto/Page';


interface PhotoBookProps extends PhotoBookInterface {
	children: (pageProps: PageInterface, key: number|string) => React.ReactNode
}

export const PhotoBook: React.SFC<PhotoBookProps> = ({ title, pages, children: renderPage }) => (
	<div className="photobook">
		{pages.map(renderPage)}
	</div>
);
