import { ImageAlignment as ImageAlignmentInterface } from '../dto/Image';
import { AbsolutePosition } from './AbsolutePosition';

export enum SlotAlignment {
    left,
    top,
    right,
    bottom,
    center,
    custom
}

export class SlotPosition {
    public static createFromDto(alignment: string, offsetLeft: number, offsetTop: number) {
        return new SlotPosition(
            SlotAlignment[alignment],
            new AbsolutePosition(offsetLeft, offsetTop)
        );
    }

    private alignment: SlotAlignment;
    public readonly offset: AbsolutePosition;

    public get slotAlignment(): string {
        return SlotAlignment[this.alignment];
    }

    public get hasCustomOffset(): boolean {
        return this.alignment === SlotAlignment.custom;
    }

    constructor(aligment: SlotAlignment = SlotAlignment.center, offset?: AbsolutePosition) {
        this.alignment = aligment;
        this.offset = aligment === SlotAlignment.custom ? offset : null;
    }


    public toDto(): ImageAlignmentInterface {
        return {
            position: this.slotAlignment,
            ...this.hasCustomOffset && {
                offsetLeft: this.offset.x,
                offsetTop: this.offset.y
            }
        };
    }
}
