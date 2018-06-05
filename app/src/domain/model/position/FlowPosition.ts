export enum RelativePosition {
    left,
    top,
    right,
    bottom,
    center,
    custom
}

export class FlowPosition {
    public readonly horizontal: RelativePosition;
    public readonly vertical: RelativePosition;

    constructor(
        horizontal: RelativePosition = RelativePosition.center, 
        vertical: RelativePosition = RelativePosition.center) {
            this.horizontal = horizontal;
            this.vertical = vertical;
    }
}
