import * as React from 'react';

import { Page as PageInterface } from '../../domain/dto/Page';
import { Title as TitleInterface } from '../../domain/dto/Title';
import { Image as ImageInterface } from '../../domain/dto/Image';

import { Page as PageModel, Orientation } from '../../domain/model/Page';
import { Layout as LayoutModel } from '../../domain/model/Layout';
import { Format as FormatModel } from '../../domain/model/Format';
import { Image as ImageModel } from '../../domain/model/Image';
import { Title as TitleModel } from '../../domain/model/Title';

import * as layouts from '../molecules/Layout';

import './Page.scss';

interface Function {
	name: string;
}


interface PageProps {
	layout: LayoutModel,
	format: FormatModel,
	orientation: Orientation,
	images: ImageModel[],
	titles: TitleModel[],
	children: [
		(title: TitleModel, key: string|number) => React.ReactNode,
		(image: ImageModel, key: string|number) => React.ReactNode
	]
}

export const Page: React.SFC<PageProps> = ({ layout, format, orientation, images, titles, children: [ titleRenderer, imageRenderer ] }) => {
	let Layout = layouts[layout.constructor.name];
	return (
		<div className="page">
			{(titles && titles.length > 0) &&
				<div className="titles">
					{titles.map(titleRenderer)}
				</div>
			}
			<Layout {...layout} images={images} name={layout.name}>
				{imageRenderer}
			</Layout>
		</div>
	)
};
