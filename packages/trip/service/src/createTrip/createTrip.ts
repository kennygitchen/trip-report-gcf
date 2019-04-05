'use strict';

// import {TapDatastore} from '@datastore/repository';

import {google} from "@google-cloud/pubsub/build/proto/pubsub";
import {Logger} from "@shared/logging";
import PubsubMessage = google.pubsub.v1.PubsubMessage;

async function create_trip(message: PubsubMessage) {
    const logger: Logger = new Logger();

    // @ts-ignore
    const tapJson = Buffer.from(message.data, 'base64').toString();

    logger.log(`Tap Created event received., ${tapJson}!`);
};

export {create_trip}
