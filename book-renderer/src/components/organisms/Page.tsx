import * as React from 'react';

import { Title } from '../molecules/Title';

import './Page.scss';
import '../../styles/layouts/index.scss';


export class Page extends React.Component<any, any> {
	render() {
		return (
			<div className="page" data-layout={this.props.page.properties['layout']}>
				<div className="titles">
					{this.props.page.titles.map((title) =>
						<Title title={title} />
					)}
				</div>
			</div>
		);
	}
}
