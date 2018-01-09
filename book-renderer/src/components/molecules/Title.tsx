import * as React from 'react';
import { Title as TitleProps } from '../../domain/model/Title';

import './Title.scss';


export const Title: React.SFC<TitleProps> = ({ value, properties }) => (
	<div className="title"
		data-type={properties.type}
		data-size={properties.size}
		style={{
			top: `${properties.top}cm`,
			left: `${properties.left}cm`,
			width: `${properties.width}cm`
		}}>
		{/*<div className="controls titleControls">
			<div className="control">
				<span className="icon icon-liga"
					data-dragpoint
					data-pos-left="title.properties['left']"
					data-pos-top="title.properties['top']">
					&#xe093;
				</span>
			</div>
		</div>*/}
		<h2>{value}</h2>
	</div>
);
