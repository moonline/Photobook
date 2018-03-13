import * as PropTypes from 'prop-types';
const { arrayOf, number, oneOf, oneOfType, shape, string } = PropTypes;


const image = shape({
	path: string.isRequired,
	properties: shape({
		display: oneOf([
			'slim',
			'vertical',
			'horizontal',
			'double',
			'wide'
		]).isRequired,
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
		]).isRequired,
		offsetLeft: oneOfType([ number, string ]),
		offsetTop: oneOfType([ number, string ])
	}).isRequired,
	caption: string,
	'$$hashKey': string
});

const title = shape({
	value: string.isRequired,
	properties: shape({
		type: oneOf([
			'standard',
			'ocean',
			'desert',
			'winter',
			'dark'
		]).isRequired,
		size: oneOf([
			'small',
			'normal',
			'large',
			'extraLarge',
			'big',
			'extraBig'
		]).isRequired,
		width: oneOfType([ number, string ]).isRequired,
		top: number.isRequired,
		left: number.isRequired
	}).isRequired,
	'$$hashKey': string
});

const page = shape({
	images: arrayOf(image).isRequired,
	titles: arrayOf(title).isRequired,
	properties: shape({
		layout: oneOf([ 'standard' ]).isRequired,
		sections: oneOf([ 1, 2, 3, 4 ]).isRequired
	}).isRequired,
	'$$hashKey': string
});

export const format = {
	title: string.isRequired,
	pages: arrayOf(page).isRequired
};
