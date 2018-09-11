import * as FS from 'fs';
import * as Path from 'path';
import * as React from 'react';
const { nativeImage: NativeImage } = require('electron');
import { inject, observer } from 'mobx-react';

import { PhotoBookStore } from '../../domain/store/PhotoBookStore';
import { RootStore } from '../../domain/store/RootStore';

import { Image as ImageModel } from '../../domain/model/Image';

import { ImageProps as ImageRendererProps } from '../molecules/Image';


interface ImageProps {
	rootStore?: RootStore;
	photoBookStore?: PhotoBookStore;
	image: ImageModel;
	children: (imageProps: ImageRendererProps) => React.ReactNode;
}

interface ImageState {
	source: string;
	thumbnail: string;
}

@inject('rootStore', 'photoBookStore')
@observer
export class Image extends React.Component<ImageProps, ImageState> {
	constructor(props) {
		super(props);
		this.state = {
			source: this.getSourcePath(props.image, props.photoBookStore.photoBook.directory),
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
		const thumbnailDirectory = this.props.photoBookStore.photoBook.thumbnailDirectory;
		const { compressionRate, scalingFactor, name } = this.props.rootStore.config.thumbnail;

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
						this.props.rootStore.logger(error);
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
				source: this.getSourcePath(nextProps.image, this.props.photoBookStore.photoBook.directory)
			});
		}
	}

	public render() {
		const { image, children: renderImage } = this.props;
		return renderImage({ ...image, path: this.state.thumbnail, imageRef: this.imageRef });
	}
}
