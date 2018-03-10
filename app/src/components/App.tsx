import * as React from 'react';
import * as PropTypes from 'prop-types';
import { observer } from 'mobx-react';

import * as Path from 'path';
import * as FS from 'fs';
import { remote } from 'electron';
const { registerOpen, messageBus } = remote.require('./application/appMenu');

import { PhotoBookStore } from '../domain/store/PhotoBookStore';

import { PhotoBook as PhotoBookInterface } from '../domain/dto/PhotoBook';

import { PhotoBook as PhotoBookModel } from '../domain/model/PhotoBook';

import { Image as ImageContainer } from './containers/Image';
import { PhotoBook as PhotoBookContainer } from './containers/PhotoBook';

import { PhotoBook } from './organisms/PhotoBook';
import { Page } from './organisms/Page';
import { Image } from './molecules/Image';
import { Title } from './molecules/Title';

import './App.scss';


const THUMBNAIL_DIRECTORY = '.thumbnails';


interface AppProps {
	store: PhotoBookStore
}
interface AppState {

}
export interface AppContext {
	resourceBasePath: string,
	thumbnail: {
		directory: string,
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
		resourceBasePath: PropTypes.string,
		thumbnail: PropTypes.shape({
			directory: PropTypes.string,
			compressionRate: PropTypes.number,
			quality: PropTypes.string,
			scalingFactor: PropTypes.number,
			name: PropTypes.func
		}),
		store: PropTypes.instanceOf(PhotoBookStore)
	}

	getChildContext = (): AppContext => {
		// todo: move thumbnail directory to store
		const resourceBasePath: string = this.props.store.directory;
		const directory: string = resourceBasePath ? Path.join(resourceBasePath, THUMBNAIL_DIRECTORY) : null;
		if (directory && !FS.existsSync(directory)){
			FS.mkdirSync(directory);
		}
		return {
			resourceBasePath,
			thumbnail: {
				directory,
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
		FS.readFile(fileName, (error, data) => {
			if (error) {
				return console.error(error);
			}
			const photoBook: PhotoBookInterface = JSON.parse(data.toString()) as PhotoBookInterface;
			// TODO: verify loaded file
			this.props.store.import(
				PhotoBookModel.createFromDto(photoBook),
				Path.dirname(fileName)
			);
		});
	}

	render() {
		const { store } = this.props;
		return (
			<div className="app">
				<main>
					{store.loaded ?
						<PhotoBookContainer photoBook={store.photoBook}>
							{(photoBook) =>
								<PhotoBook {...photoBook}>
									{(page, key) => (
										<Page {...page} key={key}>
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
					: 'Please open a file'
					}
				</main>
			</div>
		);
	}
}
