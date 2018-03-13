import * as React from 'react';
import { Image as ImageInterface } from '../../domain/dto/Image';

import './Image.scss';

export interface ImageProps extends ImageInterface {
	imageRef?: (image: HTMLElement) => void
}


export const Image: React.SFC<ImageProps> = ({ path, caption, properties, imageRef }) => (
	<figure className="image"
		data-layout={properties.display}
		data-position={properties.position}
		data-vertical-style={properties.verticalStyle}
		style={{
			...path && { backgroundImage: `url('${path}')` },
			...properties.position === 'custom' ?
				{ backgroundPosition: `${properties.offsetLeft || 0}cm ${properties.offsetTop || 0}cm`} : {}
		}}
		ref={imageRef}
	>
		<figcaption dangerouslySetInnerHTML={{__html:caption }} />
	</figure>
);
