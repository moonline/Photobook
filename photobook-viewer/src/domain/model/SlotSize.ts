import { ImageSize as ImageSizeInterface } from '../dto/Image';

export enum SlotWidth {
    slim, // 25%
    half, // 50%
    standard, // 100%
    double, // 200%
    tripple, // 300%
    wide // 400%
}

const horizontalDisplayToSlotWidth = {
    double: SlotWidth.double,
    horizontal: SlotWidth.standard,
    slim: SlotWidth.slim,
    vertical: SlotWidth.half,
    wide: SlotWidth.wide
};

const verticalStyleToSlowWidth = {
    double: SlotWidth.double,
    standard: SlotWidth.standard,
    tribble: SlotWidth.tripple
};

export class SlotSize {
    public static createFromDto(
        horizontalStyle: string,
        verticalStyle: string
    ) {
        return new SlotSize(
            horizontalStyle ? horizontalDisplayToSlotWidth[horizontalStyle] : SlotWidth.standard,
            verticalStyle ? verticalStyleToSlowWidth[verticalStyle] : SlotWidth.standard
        );
    }

    private horizontal: SlotWidth;
    private vertical: SlotWidth;

    public get horizontalWidth(): string {
        return SlotWidth[this.horizontal];
    }

    public get verticalWidth(): string {
        return SlotWidth[this.vertical];
    }

    constructor(
        horizontal: SlotWidth = SlotWidth.standard,
        vertical: SlotWidth = SlotWidth.standard) {
            this.horizontal = horizontal;
            this.vertical = vertical;
    }

    public toDto(): ImageSizeInterface {
        return {
            display: Object.keys(horizontalDisplayToSlotWidth).find((key) =>
                this.horizontal === horizontalDisplayToSlotWidth[key]
            ),
            verticalStyle: Object.keys(verticalStyleToSlowWidth).find((key) =>
                this.vertical === verticalStyleToSlowWidth[key]
            )
        };
    }
}
