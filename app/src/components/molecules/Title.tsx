import * as React from 'react';
import { Title as TitleInterface } from '../../domain/dto/Title';

import { AbsolutePosition } from '../../domain/model/position/AbsolutePosition';
import { TitleSize, TitleType } from '../../domain/model/Title';

import './Title.scss';


interface TitleProps {
	text: string;
	position: AbsolutePosition;
	type: TitleType;
	size: TitleSize;
	width: number;
}

export const Title: React.SFC<TitleProps> = ({ text, position, type, size, width }) => (
	<div className="title"
		data-type={TitleType[type]}
		data-size={TitleSize[size]}
		style={{
			left: `${position.x}cm`,
			top: `${position.y}cm`,
			width: `${width}cm`
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
		<h2 dangerouslySetInnerHTML={{__html: text}} />
	</div>
);
