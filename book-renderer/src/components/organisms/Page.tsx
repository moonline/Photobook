import * as React from 'react';

import { Page as PageModel } from '../../domain/model/Page';
import { Title as TitleModel } from '../../domain/model/Title';
import { Image as ImageModel } from '../../domain/model/Image';

import './Page.scss';
import '../../styles/layouts/index.scss';


interface PageProps extends PageModel {
	children: [
		(titleProps: TitleModel, key: string|number) => React.ReactNode,
		(imageProps: ImageModel, key: string|number) => React.ReactNode
	]
}

export const Page: React.SFC<PageProps> = ({ images, titles, properties, children: [ titleRenderer, imageRenderer ] }) => (
	<div className="page" data-layout={properties.layout}>
		<div className="titles">
			{titles.map(titleRenderer)}
		</div>
		<div className="content" data-images={images.length} data-sections={properties.sections}>
			{images.map(imageRenderer)}
		</div>
	</div>
);
