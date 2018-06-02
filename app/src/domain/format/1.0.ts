import * as PropTypes from 'prop-types';
const { arrayOf, number, oneOf, oneOfType, shape, string } = PropTypes;


const image = shape({
	caption: string,
	path: string.isRequired,
	properties: shape({
		$$hashKey: string,
		display: oneOf([
			'slim',
			'vertical',
			'horizontal',
			'double',
			'wide'
		]).isRequired,
		offsetLeft: oneOfType([ number, string ]),
		offsetTop: oneOfType([ number, string ]),
		position: oneOf([
			'left',
			'top',
			'right',
			'bottom',
			'center',
			'custom'
		]).isRequired,
		verticalStyle: oneOf([
			'standard',
			'double',
			'tribble'
		]).isRequired
	}).isRequired
});

const title = shape({
	properties: shape({
		$$hashKey: string,
		left: number.isRequired,
		size: oneOf([
			'small',
			'normal',
			'large',
			'extraLarge',
			'big',
			'extraBig'
		]).isRequired,
		top: number.isRequired,
		type: oneOf([
			'standard',
			'ocean',
			'desert',
			'winter',
			'dark'
		]).isRequired,
		width: oneOfType([ number, string ]).isRequired
	}).isRequired,
	value: string.isRequired
});

const page = shape({
	$$hashKey: string,
	images: arrayOf(image).isRequired,
	properties: shape({
		layout: oneOf([ 'standard' ]).isRequired,
		sections: oneOf([ 1, 2, 3, 4 ]).isRequired
	}).isRequired,
	titles: arrayOf(title).isRequired
});

export const format = {
	pages: arrayOf(page).isRequired,
	title: string.isRequired
};
