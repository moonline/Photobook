let ppi: number;

export function calcPPI(): number {
	if (!(ppi > 0)) {
		const element: HTMLElement = document.createElement('div');
		element.setAttribute('style', 'display: block; width: 1cm!important; padding: 0; margin: 0;');
		document.getElementsByTagName('body')[0].appendChild(element);
		ppi = element.offsetWidth;
		element.parentNode.removeChild(element);
	}
	return ppi;
}
