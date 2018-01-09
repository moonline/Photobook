import * as React from 'react';
import { Image as ImageModel } from '../../domain/model/Image';

import './Image.scss';


export const Image: React.SFC<ImageModel> = ({ path, caption, properties }) => (
	<figure className="image"
		data-layout={properties.display}
		data-position={properties.position}
		data-vertical-style={properties.verticalStyle}
		style={{
			backgroundImage: `url(${path})`,
			...properties.position === 'custom' ?
				{ backgroundPosition: `${properties.offsetLeft || 0}cm ${properties.offsetTop || 0}cm`} : {}
		}}
	>
		<figcaption>{caption}</figcaption>
	</figure>
);
