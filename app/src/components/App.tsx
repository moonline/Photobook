import { observer } from 'mobx-react';
import * as PropTypes from 'prop-types';
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
	store: RootStore;
}
export interface AppContext {
	thumbnail: {
		compressionRate: number,
		quality: string,
		scalingFactor: number,
		name: (name: string, width: number, height: number, extension: string) => string
	};
	store: RootStore;
}

@observer
export class App extends React.Component<AppProps, {}> {
	public static childContextTypes = {
		store: PropTypes.instanceOf(RootStore),
		thumbnail: PropTypes.shape({
			compressionRate: PropTypes.number,
			name: PropTypes.func,
			quality: PropTypes.string,
			scalingFactor: PropTypes.number
		})
	};

	constructor(props) {
		super(props);
	}

	public getChildContext = (): AppContext => {
		return {
			store: this.props.store,
			thumbnail: {
				compressionRate: 50,
				name: (name, width, height, extension) => `${name}-${width}-${height}.${extension}`,
				quality: 'good',
				scalingFactor: 2
			}
		};
	}

	public componentDidMount() {
		console.log('App ready ' + (new Date()).toLocaleString());
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
