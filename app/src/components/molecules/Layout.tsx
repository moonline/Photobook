import * as React from 'react';

import { Image as ImageInterface } from '../../domain/dto/Image';

import './Layout.scss';


interface RowLayoutProps {
	name: string,
	sections: number,
	images: ImageInterface[],
	children: (imageProps: ImageInterface, key: string|number) => React.ReactNode,
}

export const RowLayout: React.SFC<RowLayoutProps> = ({ name, sections, images, children: imageRenderer }) => (
	<div className="layout" data-type={name} data-sections={sections}>
		{images.map(imageRenderer)}
	</div>
);
