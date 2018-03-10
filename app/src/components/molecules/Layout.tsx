import * as React from 'react';

import { Image as ImageInterface } from '../../domain/dto/Image';

import './Layout.scss';


interface LayoutProps {
	type: string,
	sections: number,
	images: ImageInterface[],
	children: (imageProps: ImageInterface, key: string|number) => React.ReactNode,
}

export const Layout: React.SFC<LayoutProps> = ({ type, sections, images, children: imageRenderer }) => (
	<div className="layout" data-type={type} data-sections={sections}>
		{images.map(imageRenderer)}
	</div>
);
