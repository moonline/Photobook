import * as React from 'react';

import './Title.scss';


export class Title extends React.Component<any, any> {
	render() {
		return (
				<div className="title"
					data-type={this.props.title.properties['type']}
					data-size={this.props.title.properties['size']}
					style={{
						top: this.props.title.properties['top'] + 'cm',
						left: this.props.title.properties['left'] + 'cm',
						width: this.props.title.properties['width'] + 'cm'
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
					<h2>{this.props.title.value}</h2>
			</div>
		);
	}
}
