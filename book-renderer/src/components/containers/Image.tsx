import * as React from 'react';
import * as PropTypes from 'prop-types';
import * as Path from 'path';
import * as FS from 'fs';
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

	constructor(props) {
		super(props);
	}

	render() {
		const { resourceBasePath } = this.context;
		const { image, children: renderImage } = this.props;

		// TODO: fix this in compatibility import instead
		let imageAbsPath;
		if (image.path.indexOf('file://') === 0) {
			const oldPath = image.path.replace('file://', '');
			if (FS.existsSync(oldPath)) {
				imageAbsPath = oldPath;
			} else {
				imageAbsPath = Path.join(resourceBasePath, Path.basename(oldPath));
			}
		} else {
			imageAbsPath = Path.join(resourceBasePath, image.path);
		}

		const imageDataUrl: string = NativeImage
			.createFromPath(imageAbsPath)
			.resize({ width: 360, quality: 'good' })
			.toDataURL();
		return renderImage({ ...image, path: imageDataUrl });
	}
}
