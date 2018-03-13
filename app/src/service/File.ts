import * as FS from 'fs';
import * as CheckPropTypes from 'check-prop-types';
const { assertPropTypes } = CheckPropTypes;

import { PhotoBook as PhotoBookInterface } from '../domain/dto/PhotoBook';
import { format as v1 } from '../domain/format/1.0';


export const loadFromFile = (fileName: string, callback: (photoBook: PhotoBookInterface) => void) => {
	FS.readFile(fileName, (error, data) => {
		if (error) {
			throw error;
		} else {
			const photoBook: PhotoBookInterface = JSON.parse(data.toString()) as PhotoBookInterface;
			assertPropTypes(v1, photoBook, 'PhotoBook property', 'PhotoBook Editor');
			callback(photoBook);
		}
	});
}
