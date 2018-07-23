import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { RootStore } from './domain/store/RootStore';

import { App } from './components/App';

import './index.scss';

const store = new RootStore();

ReactDOM.render(
	<App store={store}/>,
	document.getElementById('root')
);
