import { observer } from 'mobx-react';
import * as PropTypes from 'prop-types';
import * as React from 'react';

import { RootStore } from '../../domain/store/RootStore';

import { Page as PageModel } from '../../domain/model/Page';
import { PhotoBook as PhotoBookModel } from '../../domain/model/PhotoBook';


interface PhotoBookProps {
	children: (photoBook: PhotoBookModel) => React.ReactNode;
}

@observer
export class PhotoBook extends React.Component<PhotoBookProps, {}> {
	public static contextTypes = {
		store: PropTypes.instanceOf(RootStore)
	};

	public context: {
		store: RootStore
	};

	constructor(props) {
		super(props);
	}

	public render() {
		const photoBookStore = this.context.store.photoBookStore;
		const { children: renderPhotoBook } = this.props;
		return photoBookStore.loaded
			? renderPhotoBook(photoBookStore.photoBook)
			: <span>Please open a file</span>;
	}
}
