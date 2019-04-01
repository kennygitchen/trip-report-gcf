'use strict';

import {Request, Response} from "express";
import {TapDatastore} from '@datastore-service/datastore';


async function form_trip(request: Request, response: Response) {
    const tapDatastore: TapDatastore = new TapDatastore();
    let taps = await tapDatastore.list();

    response.status(200).send(JSON.stringify(taps));
}

export {form_trip}
