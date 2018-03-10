import * as React from 'react';

import { Page as PageInterface } from '../../domain/dto/Page';
import { Title as TitleInterface } from '../../domain/dto/Title';
import { Image as ImageInterface } from '../../domain/dto/Image';

import { Layout } from '../molecules/Layout';

import './Page.scss';


interface PageProps extends PageInterface {
	children: [
		(titleProps: TitleInterface, key: string|number) => React.ReactNode,
		(imageProps: ImageInterface, key: string|number) => React.ReactNode
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
