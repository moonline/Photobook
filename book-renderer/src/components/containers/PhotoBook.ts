import * as React from 'react';

import { PhotoBook as PhotoBookModel } from '../../domain/model/PhotoBook';

interface PhotoBookProps {
	photoBook: PhotoBookModel,
	children: (photoBookProps: PhotoBookModel) => React.ReactNode
}

export class PhotoBook extends React.Component<PhotoBookProps, {}> {
	constructor(props) {
		super(props);
	}

	componentDidMount() {
		document.body.dispatchEvent(new CustomEvent('view-ready', { detail: {layout: 'landscape'} }));
	}

	render() {
		const { children: renderPhotoBook, photoBook } = this.props;
		return renderPhotoBook({ ...photoBook });
	}
}
