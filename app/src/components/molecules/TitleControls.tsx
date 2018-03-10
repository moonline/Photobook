import * as React from 'react';
// import Draggable from 'react-draggable';

// import calcPPI from '../../services/PPIService';

import './TitleControls.scss';


export class TitleControls extends React.Component<any, any> {
	onMove(event, dragable) {
		this.props.movedTo({
			top: this.props.top, // + dragable.deltaX/this.pxPerCm,
			left: this.props.left // + dragable.deltaY/this.pxPerCm
		});
	}

	render() {
		return (
			<div className="controls titleControls">
				<div className="control">
				{/*<Draggable
					onDrag={this.onMove.bind(this)}>
						<span className="icon icon-liga" data-dragpoint>
							&#xe093;
						</span>
					</Draggable>*/}
					<span className="icon icon-liga" data-dragpoint>
						&#xe093;
					</span>
				</div>
			</div>
		);
	}
}
