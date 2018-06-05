import * as FS from 'fs';
import * as Path from 'path';
import * as PropTypes from 'prop-types';
import * as React from 'react';
const { nativeImage: NativeImage } = require('electron');
import { observer } from 'mobx-react';

import { PhotoBookStore } from '../../domain/store/PhotoBookStore';

import { Image as ImageModel } from '../../domain/model/Image';

import { ImageProps as ImageRendererProps } from '../molecules/Image';

interface ImageProps {
	image: ImageModel;
	children: (imageProps: ImageRendererProps) => React.ReactNode;
}

interface ImageState {
	source: string;
	thumbnail: string;
}

@observer
export class Image extends React.Component<ImageProps, ImageState> {
	public static contextTypes = {
		store: PropTypes.instanceOf(PhotoBookStore),
		thumbnail: PropTypes.shape({
			compressionRate: PropTypes.number,
			name: PropTypes.func,
			quality: PropTypes.string,
			scalingFactor: PropTypes.number
		})
	};
	public context: {
		thumbnail: {
			compressionRate: number,
			quality: string,
			scalingFactor: number,
			name: (name: string, width: number, height: number, extension: string) => string
		},
		store: PhotoBookStore
	};

	constructor(props, context) {
		super(props, context);
		this.state = {
			source: this.getSourcePath(props.image, context.store.photoBook.directory),
			thumbnail: null
		};
	}

	private imageRef = (imageElement: HTMLElement) => {
		if (imageElement && !this.state.thumbnail) {
			const maxContainerExtent: number = Math.max(imageElement.clientHeight, imageElement.clientWidth);
			this.createThumbnail(maxContainerExtent);
		}
	}

	private createThumbnail = (maxContainerExtent: number) => {
		const { store: { photoBook: { thumbnailDirectory }}} = this.context;
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

	private getSourcePath = (image: ImageModel, directory): string => {
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

	public componentWillReceiveProps(nextProps: ImageProps): void {
		if (nextProps.image !== this.props.image) {
			this.setState({
				source: this.getSourcePath(nextProps.image, this.context.store.photoBook.directory)
			});
		}
	}

	public render() {
		const { image, children: renderImage } = this.props;
		return renderImage({ ...image, path: this.state.thumbnail, imageRef: this.imageRef });
	}
}
