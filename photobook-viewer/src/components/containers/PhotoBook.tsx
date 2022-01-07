import { inject, observer } from 'mobx-react';
import * as React from 'react';

import { PhotoBookStore } from '../../domain/store/PhotoBookStore';

import { PhotoBook as PhotoBookModel } from '../../domain/model/PhotoBook';


interface PhotoBookProps {
	photoBookStore?: PhotoBookStore;
	children: (photoBook: PhotoBookModel) => React.ReactNode;
}

@inject('photoBookStore')
@observer
export class PhotoBook extends React.Component<PhotoBookProps, {}> {
	public render() {
		const { children: renderPhotoBook, photoBookStore } = this.props;
		return photoBookStore.loaded
			? renderPhotoBook(photoBookStore.photoBook)
			: <span>Please open a file</span>;
	}
}
