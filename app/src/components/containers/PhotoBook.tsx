import * as React from 'react';
import * as PropTypes from 'prop-types';
import { observer } from 'mobx-react';

import { PhotoBookStore } from '../../domain/store/PhotoBookStore';

import { PhotoBook as PhotoBookModel } from '../../domain/model/PhotoBook';
import { Page as PageModel } from '../../domain/model/Page';


interface PhotoBookProps {
	children: (photoBook: PhotoBookModel) => React.ReactNode
}

@observer
export class PhotoBook extends React.Component<PhotoBookProps, {}> {
	static contextTypes = {
		store: PropTypes.instanceOf(PhotoBookStore)
	}

	context: {
		store: PhotoBookStore
	}

	constructor(props) {
		super(props);
	}

	render() {
		const { store, store: { photoBook } } = this.context;
		const { children: renderPhotoBook } = this.props;
		return store.loaded
			? renderPhotoBook(photoBook)
			: <span>Please open a file</span>;
	}
}
