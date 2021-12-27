import * as React from 'react';

import { Image as ImageInterface } from '../../domain/dto/Image';
import { Page as PageInterface } from '../../domain/dto/Page';
import { Title as TitleInterface } from '../../domain/dto/Title';

import { PageMargin } from '../../domain/model/Format';
import { Image as ImageModel } from '../../domain/model/Image';
import { Layout as LayoutModel } from '../../domain/model/Layout';
import { Orientation, Page as PageModel } from '../../domain/model/Page';
import { Title as TitleModel } from '../../domain/model/Title';

import * as layouts from '../molecules/Layout';

import './Page.scss';

interface Function {
	name: string;
}


interface PageProps {
	layout: LayoutModel;
	margin: PageMargin;
	width: number;
	height: number;
	images: ImageModel[];
	titles: TitleModel[];
	children: [
		(title: TitleModel, key: string|number) => React.ReactNode,
		(image: ImageModel, key: string|number) => React.ReactNode
	];
}

export const Page: React.SFC<PageProps> = (
	{ layout, margin, width, height, images, titles, children: [ titleRenderer, imageRenderer ], ...page }
) => {
	const Layout = layouts[layout.constructor.name];
	const styles: {[name: string]: string } = {
		height: `${height}mm`,
		padding: margin.map((value) => `${value}mm`).join(' '),
		width: `${width}mm`
	};
	return (
		<div className="page" style={styles}>
			{(titles && titles.length > 0) &&
				<div className="titles">
					{titles.map(titleRenderer)}
				</div>
			}
			<Layout {...layout} images={images} name={layout.name}>
				{imageRenderer}
			</Layout>
		</div>
	);
};
