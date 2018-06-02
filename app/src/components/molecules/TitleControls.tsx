import * as React from 'react';
// import Draggable from 'react-draggable';

// import calcPPI from '../../services/PPIService';

import './TitleControls.scss';


export class TitleControls extends React.Component<any, any> {
	private onMove(event, dragable) {
		this.props.movedTo({
			left: this.props.left, // + dragable.deltaY/this.pxPerCm
			top: this.props.top // + dragable.deltaX/this.pxPerCm
		});
	}

	public render() {
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
