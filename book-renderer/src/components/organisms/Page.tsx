import * as React from 'react';

import { Page as PageModel } from '../../domain/model/Page';
import { Title as TitleModel } from '../../domain/model/Title';
import { Image as ImageModel } from '../../domain/model/Image';

import { Layout } from '../molecules/Layout';

import './Page.scss';


interface PageProps extends PageModel {
	children: [
		(titleProps: TitleModel, key: string|number) => React.ReactNode,
		(imageProps: ImageModel, key: string|number) => React.ReactNode
	]
}

export const Page: React.SFC<PageProps> = ({ images, titles, properties, children: [ titleRenderer, imageRenderer ] }) => (
	<div className="page">
		{(titles && titles.length > 0) &&
			<div className="titles">
				{titles.map(titleRenderer)}
			</div>
		}
		<Layout type={properties.layout} images={images} sections={properties.sections}>
			{imageRenderer}
		</Layout>
	</div>
);
