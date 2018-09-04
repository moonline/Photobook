import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { MenuController } from './application/MenuController';

import { RootStore } from './domain/store/RootStore';

import { App } from './components/App';

import './index.scss';

const store = new RootStore();
const menuController = new MenuController(store);

ReactDOM.render(
	<App store={store}/>,
	document.getElementById('root')
);
