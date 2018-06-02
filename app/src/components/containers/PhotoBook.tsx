import { observer } from 'mobx-react';
import * as PropTypes from 'prop-types';
import * as React from 'react';

import { PhotoBookStore } from '../../domain/store/PhotoBookStore';

import { Page as PageModel } from '../../domain/model/Page';
import { PhotoBook as PhotoBookModel } from '../../domain/model/PhotoBook';


interface PhotoBookProps {
	children: (photoBook: PhotoBookModel) => React.ReactNode;
}

@observer
export class PhotoBook extends React.Component<PhotoBookProps, {}> {
	public static contextTypes = {
		store: PropTypes.instanceOf(PhotoBookStore)
	};

	public context: {
		store: PhotoBookStore
	};

	constructor(props) {
		super(props);
	}

	public render() {
		const { store, store: { photoBook } } = this.context;
		const { children: renderPhotoBook } = this.props;
		return store.loaded
			? renderPhotoBook(photoBook)
			: <span>Please open a file</span>;
	}
}
