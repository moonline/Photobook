import { inject } from 'mobx-react';
import * as React from 'react';

import { RootStore } from '../domain/store/RootStore';

import { Page as PageModel } from '../domain/model/Page';
import { PhotoBook as PhotoBookModel } from '../domain/model/PhotoBook';

import { Image as ImageContainer } from './containers/Image';
import { PhotoBook as PhotoBookContainer } from './containers/PhotoBook';

import { Image } from './molecules/Image';
import { Title } from './molecules/Title';
import { Page } from './organisms/Page';
import { PhotoBook } from './organisms/PhotoBook';

import './App.scss';


interface AppProps {
	rootStore?: RootStore;
}

@inject('rootStore')
export class App extends React.Component<AppProps, {}> {
	public componentDidMount() {
		this.props.rootStore.logger('App ready ' + (new Date()).toLocaleString());
	}

	public render() {
		return (
			<div className="app">
				<main>
					<PhotoBookContainer>
						{(photoBook: PhotoBookModel) =>
							<PhotoBook {...photoBook}>
								{(page: PageModel, pageKey) => (
									// TODO: fix spread getter problem
									<Page {...page} width={page.width} height={page.height} margin={page.margin} key={pageKey}>
										{[
											(title, titleKey) => (
												<Title {...title} titleSize={title.titleSize} titleType={title.titleType} key={titleKey} />
											),
											(image, imageKey) => (
												<ImageContainer image={image} key={imageKey}>
													{(imageProps) => (
														<Image {...imageProps} />
													)}
												</ImageContainer>
											)
										]}
									</Page>
								)}
							</PhotoBook>
						}
					</PhotoBookContainer>
				</main>
			</div>
		);
	}
}
