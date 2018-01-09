import * as React from 'react';
import * as PropTypes from 'prop-types';

import { PhotoBook as PhotoBookModel } from '../domain/model/PhotoBook';

import { Image as ImageContainer } from './containers/Image';

import { PhotoBook } from './organisms/PhotoBook';
import { Page } from './organisms/Page';
import { Image } from './molecules/Image';
import { Title } from './molecules/Title';

import './App.scss';
import '../styles/font.scss';


const testBook: PhotoBookModel = {
	"title":"1301-1303",
	"pages":[{
		"properties":{
			"layout":"standard",
			"sections": 1
		},
		"images":[{
			"path":"photo_2017-07-02_17-51-30.jpg",
			"properties":{
				"display":"horizontal",
				"position":"center",
				"verticalStyle":"standard"
			}
		}],
		"titles":[{
			"value":"Europe 2018",
			"properties":{
				"type":"standard",
				"size":"large",
				"width": 18,
				"top": 10,
				"left": 5
			}
		},{
			"value": "From east to west",
			"properties": {
				"type": "ocean",
				"size": "small",
				"width": 5,
				"top": 2,
				"left": 2
			}
		}]
	}]
};


export class App extends React.Component<any, any> {
	static childContextTypes = {
		resourceBasePath: PropTypes.string
	}

	getChildContext() {
		return { resourceBasePath: '/home/tobias/Downloads/' };
	}

	constructor(props) {
		super(props);
	}
	render() {
		return (
			<div className="App">
				<main>
					<PhotoBook {...testBook}>
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
				</main>
			</div>
		);
	}
}
