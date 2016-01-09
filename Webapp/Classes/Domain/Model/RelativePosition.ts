module app.domain.model {
	'use strict';

	export enum RelativePosition {
		// relativ position to the current element
		beforeLast = -2, previous = -1, current = 0, next = 1, afterNext = 2
	}
}