'use strict';

import {Tap} from "./tap";

class Trip {
    constructor(
        private on: Tap,
        private off: Tap
    ) {

    }
}

export {
    Trip
}