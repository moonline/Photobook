import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { PhotoBookStore } from './domain/store/PhotoBookStore';

import { App } from './components/App';

import './index.scss';

const store = new PhotoBookStore();

ReactDOM.render(
	<App store={store}/>,
	document.getElementById('root')
);
