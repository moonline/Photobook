import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { PhotoBookStore } from './domain/store/PhotoBookStore';

import { App } from './components/App';

import './index.scss';


ReactDOM.render(
	<App store={new PhotoBookStore()}/>,
	document.getElementById('root')
);
