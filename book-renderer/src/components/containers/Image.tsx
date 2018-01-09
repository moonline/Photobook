import * as React from 'react';
import * as PropTypes from 'prop-types';
import * as Path from 'path';
const { nativeImage: NativeImage } = require('electron');

import { Image as ImageModel } from '../../domain/model/Image';


interface ImageProps {
	image: ImageModel,
	children: (imageProps: ImageModel) => React.ReactNode
}

export class Image extends React.Component<ImageProps, {}> {
	static contextTypes = {
		resourceBasePath: PropTypes.string
	}
	context: {
		resourceBasePath: string
	}

	render() {
		const { resourceBasePath } = this.context;
		const { image, children: renderImage } = this.props;
		const imageAbsPath: string = Path.join(resourceBasePath, image.path);
		const imageDataUrl: string = NativeImage.createFromPath(imageAbsPath).toDataURL();
		return renderImage({ ...image, path: imageDataUrl });
	}
}
