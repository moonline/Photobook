import * as React from 'react';

import { SlotAlignment, SlotPosition } from '../../domain/model/SlotPosition';
import { SlotSize } from '../../domain/model/SlotSize';

import './Image.scss';

export interface ImageProps {
	path: string;
	caption: string;
	position: SlotPosition;
	size: SlotSize;
	imageRef?: (image: HTMLElement) => void;
}


export const Image: React.SFC<ImageProps> = ({ path, caption, position, size, imageRef }) => (
	<figure className="image"
		data-horizontal-size={size.horizontalWidth}
		data-position={position.slotAlignment}
		data-vertical-size={size.verticalWidth}
		style={{
			...path && { backgroundImage: `url('${path}')` },
			...position.hasCustomOffset && {
				backgroundPosition: `${position.offset.x || 0}cm ${position.offset.y || 0}cm`
			}
		}}
		ref={imageRef}
	>
		<figcaption dangerouslySetInnerHTML={{__html: caption }} />
	</figure>
);
