import { Title as TitleInterface } from '../dto/Title';

import { AbsolutePosition } from './AbsolutePosition';


export enum TitleType {
	standard,
	ocean,
	desert,
	winter,
	dark
}

export enum TitleSize {
	small,
	normal,
	large,
	extraLarge,
	big,
	extraBig
}

export class Title {
	public static createFromDto(dto: TitleInterface): Title {
		const { value, properties: { left, size, top, type, width} } = dto;
		return new Title(
			value,
			new AbsolutePosition(left, top),
			type ? TitleType[type] : TitleType.standard,
			size ? TitleSize[size] : TitleSize.normal,
			Number(width)
		);
	}

	public readonly text: string;
	public readonly position: AbsolutePosition;
	public readonly type: TitleType;
	public readonly size: TitleSize;
	public readonly width: number;

	public get titleType(): string {
		return TitleType[this.type];
	}

	public get titleSize(): string {
		return TitleSize[this.size];
	}

	constructor(
		text: string = 'New Title',
		position: AbsolutePosition = new AbsolutePosition(9, 7),
		type: TitleType = TitleType.standard,
		size: TitleSize = TitleSize.normal,
		width: number = 9
	) {
		this.text = text;
		this.position = position;
		this.type = type;
		this.size = size;
		this.width = width;
	}

	public toDto(): TitleInterface {
		return {
			properties: {
				left: this.position.x,
				size: this.titleSize,
				top: this.position.y,
				type: this.titleType,
				width: this.width
			},
			value: this.text
		};
	}
}
