import {Request, Response} from "express";
import {Tap} from "@datastore-service/model";
import {TapDatastore} from "@datastore-service/datastore";
import {sendMessage} from "@shared-service/messaging";
import {Logger} from '@shared-service/logging';


const TOPIC = 'tap-created';

async function create_tap(req: Request, res: Response) {
    const logger = new Logger();
    const tap = req.body.tap;
    let error = null;

    if (!tap) {
        logger.error(`Error trying to save Tap, tap=${tap}`);
        res.status(400).send('No Tap found');
        return;
    }

    try {
        // save to database
        logger.begin(`Tap received, save to database`);
        let tapDatastore = new TapDatastore();
        const newTapId = await tapDatastore.set(Tap.fromCSV(tap));
        logger.end(`Tap received save to database, id=${newTapId}`);

        // retrieve to confirm
        logger.begin(`Retrieve tap to confirm saving, id=${newTapId}`);
        const newTap: Tap = await tapDatastore.get(newTapId);
        logger.end(`Retrieve tap to confirm saving, id=${newTapId}`, newTap.toJSON());

        logger.begin(`publish event event, topic=${TOPIC}, tapId=${newTapId}`);
        const [messageId] = await sendMessage(TOPIC, newTap.toJSON());
        logger.end(`publish event event, topic=${TOPIC}, tapId=${newTapId}, messageId=${messageId}`);

        res.status(200).send('Tap has been processed successfully.');
    } catch (err) {
        error = err;
        console.error(`Error trying to save Tap, tap=${tap}`, error);
        res.status(400).send('Error trying to save Tap.');
    }
}

export {create_tap}

// local testing
//functions call tap-ingest --data='{"tap":"1, 22-01-2018 13:00:00, ON, Stop1, Company1, Bus37, 5500005555555559"}'

// dev testing
//gcloud functions call receive_tap --data='{"tap":"1, 22-01-2018 13:00:00, ON, Stop1, Company1, Bus37, 5500005555555559"}'