import * as React from 'react';
import * as PropTypes from 'prop-types';

import * as Path from 'path';
import * as FS from 'fs';
import { remote } from 'electron';
const { registerOpen, messageBus } = remote.require('./application/appMenu');

import { PhotoBook as PhotoBookModel } from '../domain/model/PhotoBook';

import { Image as ImageContainer } from './containers/Image';
import { PhotoBook as PhotoBookContainer } from './containers/PhotoBook';

import { PhotoBook } from './organisms/PhotoBook';
import { Page } from './organisms/Page';
import { Image } from './molecules/Image';
import { Title } from './molecules/Title';

import './App.scss';


export class App extends React.Component<{}, { photoBook: PhotoBookModel, directory: string }> {
	static childContextTypes = {
		resourceBasePath: PropTypes.string,
		thumbnail: PropTypes.shape({
			directory: PropTypes.string,
			compressionRate: PropTypes.number,
			quality: PropTypes.string,
			scalingFactor: PropTypes.number,
			name: PropTypes.func
		})
	}

	getChildContext() {
		const resourceBasePath: string = this.state.directory;
		const directory: string = resourceBasePath ? Path.join(resourceBasePath, '.thumbnails') : null;
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
			}
		};
	}

	constructor(props) {
		super(props);
		this.state = {
			photoBook: null,
			directory: null
		};
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
			if (error) { return console.error(error); }
			// TODO: verify loaded file
			this.setState({
				photoBook: JSON.parse(data.toString()) as PhotoBookModel,
				directory: Path.dirname(fileName)
			});
		});
	}

	render() {
		return (
			<div className="app">
				<main>
					{this.state.photoBook ?
						<PhotoBookContainer photoBook={this.state.photoBook}>
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
