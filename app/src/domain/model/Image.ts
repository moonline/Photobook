import { Image as ImageInterface } from '../dto/Image';

import { SlotAlignment, SlotPosition } from './SlotPosition';
import { SlotSize } from './SlotSize';

export class Image {
	public static createFromDto(dto: ImageInterface): Image {
		const { path, caption, properties: { display, position, verticalStyle, offsetLeft, offsetTop }} = dto;
		return new Image(
			path,
			caption,
			position ?
				SlotPosition.createFromDto(position, offsetLeft, Number(offsetTop))
				: new SlotPosition(),
			SlotSize.createFromDto(display, verticalStyle)
		);
	}

	public readonly path: string;
	public readonly caption: string;
	public readonly position: SlotPosition;
	public readonly size: SlotSize;

	constructor(
		path: string,
		caption: string = null,
		position: SlotPosition = new SlotPosition(SlotAlignment.center),
		size: SlotSize = new SlotSize()
	) {
		this.path = path;
		this.caption = caption;
		this.position = position;
		this.size = size;
	}
}
