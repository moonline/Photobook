import * as React from 'react';

import { PhotoBook } from '../domain/model/PhotoBook';

import { Page } from './organisms/Page';

import './App.scss';
import '../styles/font.scss';


const testBook: { [name: string]: any } = {
	"title":"1301-1303",
	"pages":[{
		"properties":{
			"layout":"standard",
			"sections":1
		},
		"images":[{
			"path":"1402%2006%20Greifensee/Bild1508.jpg",
			"properties":{
				"display":"horizontal",
				"position":"center",
				"verticalStyle":"standard"
			},
			"caption":null
		}],
		"titles":[{
			"value":"Europe 2018",
			"properties":{
				"type":"standard",
				"size":"large",
				"width":18,
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
	private photobook: PhotoBook;

	constructor(props) {
		super(props);
		this.photobook = PhotoBook.createFromDto(testBook);
	}
	render() {
		return (
			<div className="App">
				<main>
					<Page page={this.photobook.pages[0]} />
				</main>
			</div>
		);
	}
}
