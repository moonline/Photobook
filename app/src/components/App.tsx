import * as React from 'react';
import * as PropTypes from 'prop-types';
import { observer } from 'mobx-react';

import * as Path from 'path';
import * as FS from 'fs';
import { remote } from 'electron';
const { registerOpen, messageBus } = remote.require('./application/appMenu');


import { loadFromFile } from '../service/File';

import { PhotoBookStore } from '../domain/store/PhotoBookStore';

import { PhotoBook as PhotoBookInterface } from '../domain/dto/PhotoBook';

import { PhotoBook as PhotoBookModel } from '../domain/model/PhotoBook';
import { Page as PageModel } from '../domain/model/Page';

import { Image as ImageContainer } from './containers/Image';
import { PhotoBook as PhotoBookContainer } from './containers/PhotoBook';

import { PhotoBook } from './organisms/PhotoBook';
import { Page } from './organisms/Page';
import { Image } from './molecules/Image';
import { Title } from './molecules/Title';

import './App.scss';


interface AppProps {
	store: PhotoBookStore
}
interface AppState {

}
export interface AppContext {
	thumbnail: {
		compressionRate: number,
		quality: string,
		scalingFactor: number,
		name: (name: string, width: number, height: number, extension: string) => string
	},
	store: PhotoBookStore
}

@observer
export class App extends React.Component<AppProps, AppState> {
	static childContextTypes = {
		thumbnail: PropTypes.shape({
			compressionRate: PropTypes.number,
			quality: PropTypes.string,
			scalingFactor: PropTypes.number,
			name: PropTypes.func
		}),
		store: PropTypes.instanceOf(PhotoBookStore)
	}

	getChildContext = (): AppContext => {
		return {
			thumbnail: {
				compressionRate: 50,
				quality: 'good',
				scalingFactor: 2,
				name: (name, width, height, extension) => `${name}-${width}-${height}.${extension}`
			},
			store: this.props.store
		};
	}

	constructor(props) {
		super(props);
	}

	componentDidMount() {
		console.log('App ready '+(new Date()).toLocaleString());

		messageBus.listen('openFile', 'app', (filePath: string) => {
			this.onOpenFile(filePath);
		});
		messageBus.listen('print', 'app', () => {
			window.print();
		});
		messageBus.notify('clientReady');
	}

	onOpenFile(fileName) {
		try {
			loadFromFile(fileName, (photoBookDto: PhotoBookInterface) => {
				const photoBook: PhotoBookModel = PhotoBookModel.createFromDto(photoBookDto, fileName);
				const thumbnailDirectory = photoBook.thumbnailDirectory;
				if (thumbnailDirectory && !FS.existsSync(thumbnailDirectory)){
					FS.mkdirSync(thumbnailDirectory);
				}
				this.props.store.import(photoBook);
			});
		} catch (e) {
			console.error(e);
		}
	}

	render() {
		return (
			<div className="app">
				<main>
					<PhotoBookContainer>
						{(photoBook: PhotoBookModel) =>
							<PhotoBook {...photoBook}>
								{(page: PageModel, key) => (
									// TODO: fix spread getter problem
									<Page {...page} width={page.width} height={page.height} margin={page.margin} key={key}>
										{[
											(title, key) => (
												<Title {...title} key={key} />
											),
											(image, key) => (
												<ImageContainer image={image} key={key}>
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
