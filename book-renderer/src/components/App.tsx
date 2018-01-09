import * as React from 'react';
import * as PropTypes from 'prop-types';

import * as Path from 'path';
import * as FS from 'fs';
import { remote } from 'electron';
const { registerOpen } = remote.require('./application/appMenu');

import { PhotoBook as PhotoBookModel } from '../domain/model/PhotoBook';

import { Image as ImageContainer } from './containers/Image';

import { PhotoBook } from './organisms/PhotoBook';
import { Page } from './organisms/Page';
import { Image } from './molecules/Image';
import { Title } from './molecules/Title';

import './App.scss';


export class App extends React.Component<{}, { photoBook: PhotoBookModel, directory: string }> {
	static childContextTypes = {
		resourceBasePath: PropTypes.string
	}

	getChildContext() {
		return { resourceBasePath: this.state.directory || '' };
	}

	constructor(props) {
		super(props);
		this.state = {
			photoBook: null,
			directory: null
		};
	}

	componentDidMount() {
		console.log('App ready');
		registerOpen((filePaths: string[]) => {
			if(filePaths && filePaths.length > 0) {
				this.onOpenFile(filePaths[0]);
			}
		});
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
						<PhotoBook {...this.state.photoBook}>
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
					: 'Please open a file'
					}
				</main>
			</div>
		);
	}
}
