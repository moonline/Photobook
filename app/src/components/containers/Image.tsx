import * as React from 'react';
import * as PropTypes from 'prop-types';
import * as Path from 'path';
import * as FS from 'fs';
const { nativeImage: NativeImage } = require('electron');
import { observer } from 'mobx-react';

import { PhotoBookStore } from '../../domain/store/PhotoBookStore';

import { Image as ImageInterface } from '../../domain/dto/Image';

import { ImageProps as ImageRendererProps } from '../molecules/Image';

interface ImageProps {
	image: ImageInterface,
	children: (imageProps: ImageRendererProps) => React.ReactNode
}

interface ImageState {
	source: string,
	thumbnail: string
}

@observer
export class Image extends React.Component<ImageProps, ImageState> {
	static contextTypes = {
		thumbnail: PropTypes.shape({
			compressionRate: PropTypes.number,
			quality: PropTypes.string,
			scalingFactor: PropTypes.number,
			name: PropTypes.func
		}),
		store: PropTypes.instanceOf(PhotoBookStore)
	}
	context: {
		thumbnail: {
			compressionRate: number,
			quality: string,
			scalingFactor: number,
			name: (name: string, width: number, height: number, extension: string) => string
		},
		store: PhotoBookStore
	}

	constructor(props, context) {
		super(props, context);
		this.state = {
			source: this.getSourcePath(props.image, context.store.directory),
			thumbnail: null
		};
	}

	imageRef = (imageElement: HTMLElement) => {
		if (imageElement && !this.state.thumbnail) {
			const maxContainerExtent: number = Math.max(imageElement.clientHeight, imageElement.clientWidth);
			this.createThumbnail(maxContainerExtent);
		}
	}

	createThumbnail = (maxContainerExtent: number) => {
		const { store: { thumbnailDirectory }} = this.context;
		const { compressionRate, scalingFactor, name } = this.context.thumbnail;

		if (thumbnailDirectory) {
			const image = NativeImage.createFromPath(this.state.source);
			const imageDimensions: { width: number, height: number } = image.getSize();
			const minImageExtent: string = imageDimensions.width < imageDimensions.height ? 'width' : 'height';
			const thumbnail = image.resize({
				[minImageExtent]: maxContainerExtent * scalingFactor,
				quality: 'good'
			});

			const thumbnailName: string = name(
				Path.parse(this.state.source).name,
				thumbnail.getSize().width,
				thumbnail.getSize().height,
				'jpg'
			);
			const thumbnailPath = Path.join(thumbnailDirectory, thumbnailName);
			if (FS.existsSync(thumbnailPath)) {
				this.setState({ thumbnail: thumbnailPath });
			} else {
				FS.writeFile(thumbnailPath, thumbnail.toJPEG(compressionRate), (error) => {
					if (error) {
						console.error(error);
					} else {
						this.setState({ thumbnail: thumbnailPath });
					}
				});
			}
		}
	}

	componentWillReceiveProps(nextProps: ImageProps): void {
		if (nextProps.image !== this.props.image) {
			this.setState({
				source: this.getSourcePath(nextProps.image, this.context.store.directory)
			});
		}
	}

	getSourcePath = (image: ImageInterface, directory): string => {
		let imageAbsPath;
		if (image.path.indexOf('file://') === 0) {
			const oldPath = image.path.replace('file://', '');
			if (FS.existsSync(oldPath)) {
				imageAbsPath = oldPath;
			} else {
				imageAbsPath = Path.join(directory, Path.basename(oldPath));
			}
		} else {
			imageAbsPath = Path.join(directory, image.path);
		}
		return imageAbsPath;
	}

	render() {
		const { image, children: renderImage } = this.props;
		return renderImage({ ...image, path: this.state.thumbnail, imageRef: this.imageRef });
	}
}
