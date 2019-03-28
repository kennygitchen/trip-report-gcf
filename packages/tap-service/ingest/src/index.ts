import {Request, Response} from "express";
import {Tap} from "@tap-service/model";
import {TapDatastore} from "@tap-service/datastore";


async function ingest(req: Request, res: Response) {
    let tap = req.body.tap;
    let error = null;

    if (!tap) {
        console.error(`Error trying to save Tap, tap=${tap}`);
        res.status(400).send('No Tap found');
        return;
    }

    try {
        // save to database
        let tapDatastore = new TapDatastore();
        const newTapId = await tapDatastore.set(Tap.fromCSV(tap));
        console.log(`Tap saved, id=${newTapId}`);

        // retrieve to confirm
        const newTap: Tap = await tapDatastore.get(newTapId);
        console.log(`confirm saved, ${newTap.toJSON()}`);
        res.status(200).send('Tap has been processed successfully.');
    } catch (err) {
        error = err;
        console.error(`Error trying to save Tap, tap=${tap}`, error);
        res.status(400).send('Error trying to save Tap.');
    }
}

export {ingest}

// local testing
//functions call tap-ingest --data='{"tap":"1, 22-01-2018 13:00:00, ON, Stop1, Company1, Bus37, 5500005555555559"}'

// dev testing
//gcloud functions call tap-ingest --data='{"tap":"1, 22-01-2018 13:00:00, ON, Stop1, Company1, Bus37, 5500005555555559"}'